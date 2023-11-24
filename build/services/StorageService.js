"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
