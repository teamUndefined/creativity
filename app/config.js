var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";

config.express = {
    port: process.env.EXPRESS_PORT || 9191,
    ip: "127.0.0.1"
};

config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || "localhost"
};

config.routes = {
    home: {
        reg: "^(?!/@).+$",
        path: "routes/views/index.html"
    }
};

config.events = {
    server_message: {
        path: "chat/controller.js"
    },
    server_typing: {
        path: "chat/controller.js"
    },
    server_stopped_typing: {
        path: "chat/controller.js"
    },
    disconnect: {
        path: "disconnect/controller.js"
    },
    server_update_canvas: {
        path: "game/controller.js"
    },
    server_clear_canvas: {
        path: "game/controller.js"  
    },
    server_user_ready: {
        path: "lobby/controller.js"
    },
    server_match_lobby: {
        path: "lobby/controller.js"
    }
};

config.operations = {
    apiKey: "/@",
    apis: {
        // special facebook login API operations
        facebookLogin: {
            url: "/auth/facebook",
            method: "get",
            path: "login/controller.js",
            access: {
                roles: ["visitator"]
            }
        },
        facebookCallback: {
            url: "/auth/facebook/callback",
            method: "get",
            path: "login/controller.js",
            access: {
                roles: ["visitator"]
            }
        },
        // app operations
        logout: {
            url: "/logout",
            method: "post",
            path: "login/controller.js",
            access: {
                roles: ["user"]
            }
        },
        createLobby: {
            url: "/createLobby",
            method: "get",
            path: "lobby/controller.js",
            access: {
                roles: ["user"]
            }
        }
    }
};