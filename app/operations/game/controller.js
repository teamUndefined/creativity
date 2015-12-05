exports.update_canvas = function (args, socket, s) {
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
    sockets.emit("new_canvas", socket.id, canvas);
};