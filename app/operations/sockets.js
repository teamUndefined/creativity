var config = require("../config");
var join = require('path').join;
var log = require('bole')('operations/sockets');

var event_cache = {};
var s;

function handleEvent (event, args, config, socket) {

    // TODO check permissions

    // cache event if it isn't already
    if (!event_cache[event]) {
        try {
            event_cache[event] = require(join(__dirname + '/' + config.path))[event];
        } catch (error) {
            return console.error(error, 'Error while caching event: ' + event);
        }
    }

    // call event handler
    event_cache[event](args, socket, s);
}

function emitToRoom (event, emitterId, args) {
    // emit to all clients
    Object.keys(this.clients).forEach(function (client) {
        if (client === emitterId) return;
        s.io.to(client).emit(event, args);
    });
}

module.exports = function (core) {
    var io = core.s.io;
    s = core.s;

    // listen for connections
    io.on('connection', function (socket) {
        var host = socket.request.headers.host;
        var path = socket.request.headers.referer;

        path = path.slice(path.indexOf(host) + host.length);
        var reg = new RegExp("^/game/[^/]+/*$");

        // create room or join room
        if (path && path.match(reg)) {
            
            // create room if it does not exist
            if (!s.sockets[path]) {
                s.sockets[path] = {
                    status: "open",
                    path: path
                };
            }

            // init client
            s.sockets[path].clients = s.sockets[path].clients || {};
            s.sockets[path].clients[socket.id] = {
                id: socket.id,
                username: "default_username",
                emit: function (event, args) {
                    s.io.to(socket.id).emit(event, args);
                }
            };

            s.sockets[path].emit = emitToRoom;

            // get all connected clients
            clients = [];
            Object.keys(s.sockets[path].clients).forEach(function (c) {
                clients.push(s.sockets[path].clients[c].username);
            });

            // emit events
            s.sockets[path].emit("total_clients", null, clients);
            s.sockets[path].emit("new_client", socket.id, s.sockets[path].clients[socket.id].username);
        }

        // listen for events
        for (var event in config.events) {
            (function (event) {
                socket.on(event, function (args) {
                    handleEvent(event, args, config.events[event], socket);
                });
            })(event);
        }
    });
};