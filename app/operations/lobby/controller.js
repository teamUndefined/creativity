var mongo = require("../../lib/mongo");
var ObjectId = mongo.ObjectID;

exports.createLobby = function (source) {

	// generate lobby id
	var lobbyId = ObjectId();

	source.res.setHeader("Location", "/lobby/" + lobbyId);
	source.res.status(302).end();
};