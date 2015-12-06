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
        Object.keys(sockets.players).forEach(function (c) {
            var player = sockets.players[c];
            if (!player.ready) {
                allReady = false;
                return;
            }
        });

        sockets.ready = true;
        if (allReady) {
            sockets.emit("all_ready", null);
        }
    }
};

exports.server_match_lobby = function (args, socket, s) {

    // get room path
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var room = s.sockets[path];

    // check if room exists
    if (!room) {
        socket.emit("err");
        return;
    }

    // conditions
    // the lobby must be full
    if (room.status !== "full" || Object.keys(room.players).length !== 1 || !room.ready) {
        socket.emit("err");
        return;
    }

    // tag this room as looking for another stranger
    room.status = "matching";

    // find another room in matching queue
    var match = s.sockets[s.matchQueue.shift()];

    // invite to room if match found
    if (match) {

        // create a new gameId
        var gameId = ObjectId();
        var gamePath = "/game/" + gameId;

        // create game
        var game = {
            path: gamePath,
            status: "open",
            type: "game",
            players: {},
            clients: {}
        };

        // merge players
        game.players = {};
        Object.keys(room.players).forEach(function (c) {
            game.players[c] = players.clients[c];
        });
        Object.keys(match.players).forEach(function (c) {
            game.players[c] = match.players[c];
        });

        // add game room
        s.sockets[gamePath] = game;

        // emit match found
        game.clients = {};
        Object.keys(room.clients).forEach(function (c) {
            room.clients[c].emit("match_made", gameId);
        });
        Object.keys(match.clients).forEach(function (c) {
            match.clients[c].emit("match_made", gameId);
        });

        // remove old rooms
        delete s.sockets[path];
        delete s.sockets[match.path];

    } else {
        s.matchQueue.push(path);
    }
};