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
    server_disconnect: {
        path: "chat/controller.js"
    },
    server_update_canvas: {
        path: "game/controller.js"
    },
    server_clear_canvas: {
        path: "game/controller.js"  
    }
};

config.operations = {
    apiKey: "/@",
    apis: {}
};