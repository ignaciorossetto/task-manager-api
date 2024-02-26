"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsParserMiddleware = exports.newUserParserMiddleware = void 0;
const utils_1 = require("../../utils/utils");
const error_1 = __importDefault(require("../../utils/error"));
const newUserParserMiddleware = (req, _, next) => {
    const user = req.body;
    (0, utils_1.parseNewUserBody)(user);
    return next();
};
exports.newUserParserMiddleware = newUserParserMiddleware;
const fieldsParserMiddleware = (req, _, next) => {
    const fullName = req.body.fullName;
    if (fullName) {
        fullName && (0, utils_1.parseNewTaskBody)(fullName);
        next();
    }
    else {
        throw (0, error_1.default)({
            name: "Invalid req body",
            code: 400,
            message: "Missing fullName",
            layer: "Controller",
            status: "Error",
        });
    }
};
exports.fieldsParserMiddleware = fieldsParserMiddleware;
