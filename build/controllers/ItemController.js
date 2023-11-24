"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.deleteItem = exports.editItem = exports.listItemsByName = exports.listItems = exports.getItem = exports.createItem = void 0;
var client_1 = require("@prisma/client");
var path_1 = __importDefault(require("path"));
var prisma = new client_1.PrismaClient();
var createItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, category, color, amount, weight, dimension, price, description, item, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, category = _a.category, color = _a.color, amount = _a.amount, weight = _a.weight, dimension = _a.dimension, price = _a.price, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!!req.file) return [3 /*break*/, 2];
                res.send("File not found");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, prisma.item.create({
                    data: {
                        name: name,
                        image: "/images/".concat(req.file.filename),
                        category: category,
                        color: color,
                        weight: parseFloat(weight),
                        dimension: dimension,
                        description: description,
                        amount: parseInt(amount),
                        price: parseFloat(price)
                    }
                })];
            case 3:
                item = _b.sent();
                res.send(item);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                res.send("Error creating item");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createItem = createItem;
var getItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, item, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.$connect()];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.item.findUnique({
                        where: {
                            id: id
                        }
                    })];
            case 3:
                item = _a.sent();
                res.send(item);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                res.send("Error getting item");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getItem = getItem;
var listItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, _a, items, itemsOrderByNewer, itemsOrderByOlder, itemsOrderByNameDesc, itemsOrderByNameAsc, itemsOrderByPriceHighest, itemsOrderByPriceLowest, allItems, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 19, , 20]);
                order = req.params.order;
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _b.sent();
                _a = parseInt(order);
                switch (_a) {
                    case 99: return [3 /*break*/, 2];
                    case 0: return [3 /*break*/, 4];
                    case 1: return [3 /*break*/, 6];
                    case 2: return [3 /*break*/, 8];
                    case 3: return [3 /*break*/, 10];
                    case 4: return [3 /*break*/, 12];
                    case 5: return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 2: return [4 /*yield*/, prisma.item.findMany()];
            case 3:
                items = _b.sent();
                res.send(items);
                return [3 /*break*/, 18];
            case 4: return [4 /*yield*/, prisma.item.findMany({
                    orderBy: {
                        price: "desc"
                    }
                })];
            case 5:
                itemsOrderByNewer = _b.sent();
                res.send(itemsOrderByNewer);
                return [3 /*break*/, 18];
            case 6: return [4 /*yield*/, prisma.item.findMany({
                    orderBy: {
                        price: "desc"
                    }
                })];
            case 7:
                itemsOrderByOlder = _b.sent();
                res.send(itemsOrderByOlder);
                return [3 /*break*/, 18];
            case 8: return [4 /*yield*/, prisma.item.findMany({
                    orderBy: {
                        name: "desc"
                    }
                })];
            case 9:
                itemsOrderByNameDesc = _b.sent();
                res.send(itemsOrderByNameDesc);
                return [3 /*break*/, 18];
            case 10: return [4 /*yield*/, prisma.item.findMany({
                    orderBy: {
                        name: "asc"
                    }
                })];
            case 11:
                itemsOrderByNameAsc = _b.sent();
                res.send(itemsOrderByNameAsc);
                return [3 /*break*/, 18];
            case 12: return [4 /*yield*/, prisma.item.findMany({
                    orderBy: {
                        price: "desc"
                    }
                })];
            case 13:
                itemsOrderByPriceHighest = _b.sent();
                res.send(itemsOrderByPriceHighest);
                return [3 /*break*/, 18];
            case 14: return [4 /*yield*/, prisma.item.findMany({
                    orderBy: {
                        price: "asc"
                    }
                })];
            case 15:
                itemsOrderByPriceLowest = _b.sent();
                res.send(itemsOrderByPriceLowest);
                return [3 /*break*/, 18];
            case 16: return [4 /*yield*/, prisma.item.findMany()];
            case 17:
                allItems = _b.sent();
                res.send(allItems);
                return [3 /*break*/, 18];
            case 18: return [3 /*break*/, 20];
            case 19:
                error_3 = _b.sent();
                res.send(error_3);
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/];
        }
    });
}); };
exports.listItems = listItems;
var listItemsByName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, items, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                name = req.params.name;
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.item.findMany({
                        where: {
                            name: {
                                contains: name
                            }
                        }
                    })];
            case 2:
                items = _a.sent();
                res.send(items);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.send(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.listItemsByName = listItemsByName;
var editItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item_id, _a, name, amount, price, item, updatedItem, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                item_id = req.body.item_id;
                _a = req.body, name = _a.name, amount = _a.amount, price = _a.price;
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _b.sent();
                return [4 /*yield*/, prisma.item.findUnique(item_id)];
            case 2:
                item = _b.sent();
                if (!item) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.item.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            name: name,
                            amount: parseInt(amount),
                            price: parseFloat(price)
                        }
                    })];
            case 3:
                updatedItem = _b.sent();
                res.send(updatedItem);
                return [3 /*break*/, 5];
            case 4:
                res.send("Item not found");
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _b.sent();
                res.send(error_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.editItem = editItem;
var deleteItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item_id, deletedUser, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                item_id = req.body.item_id;
                return [4 /*yield*/, prisma.user.delete({
                        where: {
                            id: item_id
                        }
                    })];
            case 2:
                deletedUser = _a.sent();
                res.send("Item deleted");
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.send(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteItem = deleteItem;
var getImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image, filePath;
    return __generator(this, function (_a) {
        try {
            image = req.params.image;
            console.log(image);
            filePath = path_1.default.join(__dirname, '..', '..', 'public', 'images');
            res.sendFile(image, { root: filePath });
        }
        catch (error) {
            res.send(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getImage = getImage;
