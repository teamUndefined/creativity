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
    index: {
        reg: "^/*$",
        path: "routes/views/index.html"
    }
};

config.operations = {
    apiKey: "/@",
    apis: {}
};