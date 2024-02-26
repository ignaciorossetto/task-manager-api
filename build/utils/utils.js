"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExtractor = exports.generateToken = exports.verifyToken = exports.isValidPassword = exports.createHash = exports.parseNewUserBody = exports.parseNewTaskBody = void 0;
const envConfig_1 = __importDefault(require("../config/envConfig"));
const error_1 = __importDefault(require("./error"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isString = (string) => {
    return typeof string === "string";
};
const parseNewTaskBody = (value) => {
    if (!isString(value)) {
        throw (0, error_1.default)({
            name: "Invalid task body",
            code: 422,
            message: "Invalid type or empty title/description",
            layer: "Controller",
            status: "Error",
        });
    }
    return true;
};
exports.parseNewTaskBody = parseNewTaskBody;
const parseNewUserBody = (user) => {
    const throwError = (value, code) => {
        throw (0, error_1.default)({
            name: "Invalid user body",
            code: code,
            message: value,
            layer: "Controller",
            status: "Error",
        });
    };
    if (!user.email || !user.password || !user.fullName) {
        throwError("Missing email/password/fullName", 400);
    }
    if (!isString(user.email)) {
        throwError("Invalid type or empty email", 422);
    }
    else if (!isString(user.password)) {
        throwError("Invalid type or empty password", 422);
    }
    else if (!isString(user.fullName)) {
        throwError("Invalid type or empty fullName", 422);
    }
    else
        return true;
    return true;
};
exports.parseNewUserBody = parseNewUserBody;
const createHash = (password) => {
    const hashedPass = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    return hashedPass;
};
exports.createHash = createHash;
const isValidPassword = (user, password) => {
    const comparedPass = bcrypt_1.default.compareSync(password, user.password);
    return comparedPass;
};
exports.isValidPassword = isValidPassword;
const verifyToken = (token) => {
    const secret = envConfig_1.default.jwtSecret;
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;
const generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign(`${user.email}-${user.fullName}`, envConfig_1.default.jwtSecret);
    return token;
};
exports.generateToken = generateToken;
const jwtExtractor = (req) => {
    let token = null;
    if (req && req.headers.authorization) {
        token = req.headers.authorization.split("Bearer ")[1];
    }
    return token;
};
exports.jwtExtractor = jwtExtractor;
