exports.server_message = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var sockets = s.sockets[path];

    sockets.emit("new_message", socket.id, {
        emitter: sockets.clients[socket.id],
        msg: args
    });
};

exports.server_typing = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);

    var sockets = s.sockets[path];

    sockets.emit("is_typing", socket.id);
};

exports.server_stopped_typing = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);

    var sockets = s.sockets[path];

    sockets.emit("has_stopped_typing", socket.id);
};

exports.disconnect = function (args, socket, s) {

    // get room path
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);

    // check if room exists
    if (s.sockets[path]) {

        if (s.sockets[path].clients && s.sockets[path].clients[socket.id]) {

            s.sockets[path].emit("client_left", socket.id, s.sockets[path].clients[socket.id]);

            delete s.sockets[path].clients[socket.id];

            var arr = [];
            Object.keys(s.sockets[path].clients).forEach(function (item) {
                arr.push(s.sockets[path].clients[item]);
            });
            s.sockets[path].emit("total_clients", null, arr);

            // delete room if no more clients
            if (!Object.keys(s.sockets[path].clients).length) {
                delete s.sockets[path];
            }
        }
    }
};