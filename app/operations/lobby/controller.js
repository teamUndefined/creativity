var mongo = require("../../lib/mongo");
var ObjectId = mongo.ObjectID;
var cookieParser = require('cookie');

exports.createLobby = function (source) {

    // generate lobby id
    var lobbyId = ObjectId();

    source.s.sockets["/lobby/" + lobbyId] = {
        path: "/lobby/" + lobbyId,
        status: "waiting",
        type: "lobby",
        players: {},
        clients: {},
        strangers: false
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
    if (Object.keys(sockets.players).length >= 1 && Object.keys(sockets.players).length <= 10) {
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
    // the lobby must ha between 1 and 10 players
    if (Object.keys(room.players).length < 1 || Object.keys(room.players).length > 10) {
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
            game.players[c] = room.players[c];
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

exports.server_join_lobby = function (args, socket, s) {

    // parse login data (if exists)
    var loginInfo = null;
    if (cookie && cookie.login) {
        if (cookie.login.indexOf("{") !== -1 && cookie.login.indexOf("}") !== -1) {
            var loginString = cookie.login.slice(cookie.login.indexOf("{"), cookie.login.indexOf("}") + 1);

            try {
                loginInfo = JSON.parse(loginString);
            } catch (e) {
                console.error(e, "faild to parse login cookie");
                socket.emit('err');
                return;
            }
        }
    }

    if (!loginInfo) {
        console.error("no user data");
        socket.emit('err');
        return;
    }

    // find rooms
    var match = null;
    Object.keys(s.sockets).forEach(function (c) {
        var room = s.sockets[c];
        if (room.type === "lobby" && room.status !== "full") {
            match = room;
            return
        }
    });

    if (match) {
        socket.emit("lobby_found", match.path);
    } else {
        socket.emit("lobby_not_found");
    }
};

exports.server_toggle_strangers = function (args, socket, s) {
    // get room path
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);
    var room = s.sockets[path];

    if (!room) {
        return;
    }

    if (!room.strangers) {
        room.stragers = true;
    } else {
        room.strangers = false;
    }
};