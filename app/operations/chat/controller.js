exports.server_message = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var sockets = s.sockets[path];

    // check if room exists
    if (!sockets) {
        return;
    }

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

    // check if room exists
    if (!sockets) {
        return;
    }

    sockets.emit("is_typing", socket.id);
};

exports.server_stopped_typing = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var sockets = s.sockets[path];

    // check if room exists
    if (!sockets) {
        return;
    }

    sockets.emit("has_stopped_typing", socket.id);
};