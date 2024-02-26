"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsParserMiddleware = exports.newTaskParserMiddleware = void 0;
const utils_1 = require("../../utils/utils");
const error_1 = __importDefault(require("../../utils/error"));
const newTaskParserMiddleware = (req, _, next) => {
    const title = req.body.title;
    const description = req.body.description;
    if (!title || !description) {
        throw (0, error_1.default)({
            name: "Invalid task body",
            code: 400,
            message: "Missing title/description",
            layer: "Controller",
            status: "Error",
        });
    }
    (0, utils_1.parseNewTaskBody)(title);
    (0, utils_1.parseNewTaskBody)(description);
    return next();
};
exports.newTaskParserMiddleware = newTaskParserMiddleware;
const fieldsParserMiddleware = (req, _, next) => {
    const title = req.body.title;
    const description = req.body.description;
    if (title || description) {
        title && (0, utils_1.parseNewTaskBody)(title);
        description && (0, utils_1.parseNewTaskBody)(description);
        next();
    }
    else {
        throw (0, error_1.default)({
            name: "Invalid task body",
            code: 400,
            message: "Missing title/description/completed",
            layer: "Controller",
            status: "Error",
        });
    }
};
exports.fieldsParserMiddleware = fieldsParserMiddleware;
