"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = process.env["SECRET"] || "DEFAULT_SECRET";
var authorize = function (req, res, next) {
    try {
        console.log("teste");
        var token = req.headers.authorization.split(" ")[1];
        var decode = jsonwebtoken_1.default.verify(token, secret);
        req.body.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Error" });
    }
};
var refreshToken = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var decode = jsonwebtoken_1.default.verify(token, secret);
        req.body.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Error" });
    }
};
exports.default = authorize;
