exports.disconnect = function (args, socket, s) {

    // get room path
    var host = socket.request.headers.host;
    var path = socket.request.headers.referer;
    path = path.slice(path.indexOf(host) + host.length);

    // check if room exists
    if (s.sockets[path]) {

        if (s.sockets[path].clients && s.sockets[path].clients[socket.id]) {

            var isLeft = false;
            var facebook_uid = s.sockets[path].clients[socket.id].facebook_uid;

            delete s.sockets[path].clients[socket.id];

            // check if user is left
            Object.keys(s.sockets[path].clients).forEach(function (c) {
                var client = s.sockets[path].clients[c];

                if (client.facebook_uid === facebook_uid) {
                    isLeft = true;
                    return;
                }
            });

            if (!isLeft) {
                // delete player
                delete s.sockets[path].players[facebook_uid];
                s.sockets[path].emit("client_left", socket.id, s.sockets[path].players[facebook_uid]);

                // get all connected players
                players = [];
                Object.keys(s.sockets[path].players).forEach(function (c) {
                    var player = s.sockets[path].players[c];
                    players.push({
                        id: player.id,
                        name: player.name,
                        facebook_uid: player.facebook_uid
                    });
                });
                s.sockets[path].emit("total_clients", null, players);

                var gameReg = new RegExp("^/game/[^/]+/*$");
                if (path.match(gameReg)) {
                    if (Object.keys(s.sockets[path].players).length === 1) {
                        s.sockets[path].emit("err", null);
                    }
                }

                // delete room if no more clients
                if (!Object.keys(s.sockets[path].players).length || !Object.keys(s.sockets[path].clients).length) {
                    delete s.sockets[path];
                }
            }
        }
    }
};