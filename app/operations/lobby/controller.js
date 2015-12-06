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