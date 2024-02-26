"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParserMiddleware = void 0;
const mongoose_1 = require("mongoose");
const error_1 = __importDefault(require("../utils/error"));
const idParserMiddleware = (req, _, next) => {
    const id = req.params.id;
    if (!id) {
        throw (0, error_1.default)({
            name: "Missing id parameter",
            code: 400,
            message: "Missing id parameter",
            layer: "Controller",
            status: "Error",
        });
    }
    const objectId = id;
    if (!mongoose_1.Types.ObjectId.isValid(objectId)) {
        throw (0, error_1.default)({
            name: "Invalid id parameter",
            code: 422,
            message: "Invalid id parameter",
            layer: "Controller",
            status: "Error",
        });
    }
    next();
};
exports.idParserMiddleware = idParserMiddleware;
