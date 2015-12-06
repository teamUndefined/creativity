exports.server_update_canvas = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var sockets = s.sockets[path];

    // check if client that changed the canvas is in the room
    if (!sockets.clients[socket.id]) {
        return;
    }

    // get canvas
    var canvas = args;

    // emit the new canvas
    sockets.emit("update_canvas", socket.id, canvas);
};

exports.server_clear_canvas = function (args, socket, s) {
    // get room
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var sockets = s.sockets[path];

    // check if client that changed the canvas is in the room
    if (!sockets.clients[socket.id]) {
        socket.emit("err");
        return;
    }

    // emit the new canvas
    sockets.emit("clear_canvas", socket.id);
};