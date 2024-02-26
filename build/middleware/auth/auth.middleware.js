"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtUserAuthMiddleware = void 0;
const utils_1 = require("../../utils/utils");
const error_1 = __importDefault(require("../../utils/error"));
const jwtUserAuthMiddleware = (req, _, next) => {
    try {
        const token = (0, utils_1.jwtExtractor)(req);
        if (!token) {
            throw (0, error_1.default)({
                name: "Unauthorized",
                message: "Missing jwt token",
                code: 401,
                status: "Error",
                layer: "Auth Middleware",
            });
        }
        const verifiedToken = (0, utils_1.verifyToken)(token);
        if (!verifiedToken) {
            throw (0, error_1.default)({
                name: "Unauthorized",
                message: "Invalid jwt token",
                code: 401,
                status: "Error",
                layer: "Auth Middleware",
            });
        }
    }
    catch (error) {
        next(error);
    }
    next();
};
exports.jwtUserAuthMiddleware = jwtUserAuthMiddleware;
