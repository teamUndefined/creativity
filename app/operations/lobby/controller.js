var mongo = require("../../lib/mongo");
var ObjectId = mongo.ObjectID;

exports.createLobby = function (source) {

    // generate lobby id
    var lobbyId = ObjectId();

    source.s.sockets["/lobby/" + lobbyId] = {
        path: "/lobby/" + lobbyId,
        status: "waiting",
        type: "lobby",
        players: {},
        clients: {}
    };

    source.res.setHeader("Location", "/lobby/" + lobbyId);
    source.res.status(302).end();
};

exports.server_user_ready = function (args, socket, s) {
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var sockets = s.sockets[path];

    // check if room exists
    if (!sockets) {
        console.error(new Error("Room does not exist"));
        return;
    }

    // check if user exists
    if (!sockets.players[args]) {
        console.error(new Error("Player does not exist"));
        return;
    }

    // ready user
    sockets.players[args].ready = true;

    // check if all are ready
    var allReady = true
    if (sockets.status === "full") {
        Object().keys(sockets.players).forEach(function (c) {
            var player = sockets.players[c];
            if (!player.ready) {
                allReady = false;
                return;
            }
        });

        if (allReady) {
            sockets.emit("all_ready", null);
        }
    }
}