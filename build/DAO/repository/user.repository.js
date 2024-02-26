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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.updateUser = exports.getOneUser = exports.getAllUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const user_model_1 = __importDefault(require("../models/user.model"));
const error_1 = __importDefault(require("../../utils/error"));
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = envConfig_1.default.mongo_uri;
    try {
        yield mongoose_1.default.connect(url);
    }
    catch (error) {
        throw (0, error_1.default)({
            name: "DB error",
            message: "Error connecting to database",
            layer: "Repository",
            code: 500,
            status: "Error",
        });
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    return user_model_1.default.find().exec();
});
exports.getAllUsers = getAllUsers;
const getOneUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    const user = yield user_model_1.default.findOne(obj).lean();
    return user;
});
exports.getOneUser = getOneUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    return user_model_1.default.findByIdAndUpdate(id, user, { new: true }).exec();
});
exports.updateUser = updateUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    return user_model_1.default.create(user);
});
exports.createUser = createUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    yield user_model_1.default.findByIdAndDelete(id).exec();
});
exports.deleteUser = deleteUser;
