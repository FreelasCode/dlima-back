"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var PORT = process.env.PORT || 8080;
new app_1.App().server.listen(PORT);
console.log("server listening on http://localhost:3000");
