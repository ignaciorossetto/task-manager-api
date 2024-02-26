"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getOneUser = exports.getAllUsers = void 0;
const utils_1 = require("../utils/utils");
const UserService = __importStar(require("../services/user.service"));
const error_1 = __importDefault(require("../utils/error"));
const getAllUsers = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService.fetchAllUsers();
        res.json({
            status: "OK",
            payload: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const users = yield UserService.fetchOneUserById(id);
        res.json({
            status: "OK",
            payload: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUser = getOneUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        yield UserService.fetchOneUserByEmail(user.email, "signup");
        const hashedPassword = (0, utils_1.createHash)(user.password);
        user.password = hashedPassword;
        yield UserService.addUser(user);
        res.json({
            status: "OK",
            message: "User signed up successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const obj = req.body;
    try {
        const user = yield UserService.modifyAllowedAttrUser(id, obj);
        if (!user) {
            throw (0, error_1.default)({
                name: "User not found",
                message: "User not found",
                code: 404,
                layer: "Controller",
            });
        }
        res.json({
            status: "OK",
            payload: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
