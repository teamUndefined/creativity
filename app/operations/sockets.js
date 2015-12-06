var config = require("../config");
var join = require('path').join;
var log = require('bole')('operations/sockets');
var cookieParser = require('cookie');

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

    // init the room matching queue
    s.matchQueue = [];

    // listen for connections
    io.on('connection', function (socket) {
        var host = socket.request.headers.host;
        var path = socket.request.headers.referer;

        path = path.slice(path.indexOf(host) + host.length);
        var gameReg = new RegExp("^/game/[^/]+/*$");
        var lobbyReg = new RegExp("^/lobby/[^/]+/*$");

        // get cookie
        cookie = socket.handshake.headers.cookie;

        if (cookie) {
            cookie = cookieParser.parse(cookie);
        }

        // parse login data (if exists)
        var loginInfo = null;
        if (cookie && cookie.login) {
            if (cookie.login.indexOf("{") !== -1 && cookie.login.indexOf("}") !== -1) {
                var loginString = cookie.login.slice(cookie.login.indexOf("{"), cookie.login.indexOf("}") + 1);

                try {
                    loginInfo = JSON.parse(loginString);
                } catch (e) {
                    console.error(e, "faild to parse login cookie");
                }
            }
        }

        // create game
        if (path && path.match(gameReg)) {
            if (!loginInfo) {
                console.error(new Error ("No login info"));
                return;
            }

            if (!s.sockets[path]) {
                console.error(new Error ("Room does not exist"));
                return;
            }

            // init client
            s.sockets[path].clients = s.sockets[path].clients || {};
            s.sockets[path].clients[socket.id] = {
                id: socket.id,
                name: loginInfo ? loginInfo.name || "default_username" : "default_username",
                facebook_uid: loginInfo ? loginInfo.facebook_uid || null : null,
                emit: function (event, args) {
                    s.io.to(socket.id).emit(event, args);
                }
            };

            s.sockets[path].emit = emitToRoom;

            // get all connected clients
            clients = [];
            Object.keys(s.sockets[path].clients).forEach(function (c) {
                var client = s.sockets[path].clients[c];
                clients.push({
                    id: client.id,
                    name: client.name,
                    facebook_uid: client.facebook_uid
                });
            });

            // emit events
            s.sockets[path].emit("total_clients", null, clients);
            s.sockets[path].emit("new_client", socket.id, s.sockets[path].clients[socket.id]);

        // create lobby
        } else if (path && path.match(lobbyReg)) {
            if (!loginInfo) {
                console.error(new Error ("No login info"));
                return;
            }

            // check if lobby exists
            if (!s.sockets[path]) {
                console.error(new Error ("Room does not exist"));
                return;
            }

            // init client
            s.sockets[path].clients = s.sockets[path].clients || {};
            s.sockets[path].clients[socket.id] = {
                id: socket.id,
                name: loginInfo ? loginInfo.name || "default_username" : "default_username",
                facebook_uid: loginInfo ? loginInfo.facebook_uid || null : null,
                emit: function (event, args) {
                    s.io.to(socket.id).emit(event, args);
                }
            };
            s.sockets[path].emit = emitToRoom;

            // add player
            if (s.sockets[path].status === "waiting") {
                
                s.sockets[path].players[loginInfo.facebook_uid] = {
                    name: loginInfo ? loginInfo.name || "default_username" : "default_username",
                    facebook_uid: loginInfo ? loginInfo.facebook_uid || null : null
                };

                // get all connected players
                var players = [];
                Object.keys(s.sockets[path].players).forEach(function (c) {
                    var player = s.sockets[path].players[c];
                    players.push({
                        name: loginInfo.name,
                        facebook_uid: loginInfo.facebook_uid
                    });
                });

                // emit events
                s.sockets[path].emit("total_clients", null, players);
                s.sockets[path].emit("new_client", socket.id, s.sockets[path].players[loginInfo.facebook_uid]);

                // close room if 3 players
                if (players.length >=3) {
                    s.sockets[path].status = "full";
                }
            } 
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