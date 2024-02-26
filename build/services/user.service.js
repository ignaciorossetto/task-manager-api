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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.modifyAllowedAttrUser = exports.fetchOneUserByEmail = exports.fetchUserAtLogin = exports.fetchOneUserById = exports.fetchAllUsers = void 0;
const user_repository_1 = require("../DAO/repository/user.repository");
const error_1 = __importDefault(require("../utils/error"));
const utils_1 = require("../utils/utils");
const fetchAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, user_repository_1.getAllUsers)();
});
exports.fetchAllUsers = fetchAllUsers;
const fetchOneUserById = (id, type = "other") => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.getOneUser)({ _id: id });
    if (!user) {
        throw (0, error_1.default)({
            name: "User not found",
            code: 404,
            message: `Invalid id: ${id}`,
            layer: "Service",
            status: "Error",
        });
    }
    else if (type === "signup" && user) {
        throw (0, error_1.default)({
            name: "User already registered",
            code: 404,
            message: `Try with an other email`,
            layer: "Service",
            status: "Error",
        });
    }
    const { password } = user, other = __rest(user, ["password"]);
    return other;
});
exports.fetchOneUserById = fetchOneUserById;
const fetchUserAtLogin = (email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.getOneUser)({ email: email });
    if (!user) {
        throw (0, error_1.default)({
            name: "Bad login attempt",
            code: 404,
            message: `Invalid email or password`,
            layer: "Service",
            status: "Error",
        });
    }
    const validPassword = (0, utils_1.isValidPassword)(user, pass);
    if (!validPassword) {
        throw (0, error_1.default)({
            name: "Bad login attempt",
            code: 404,
            message: `Invalid email or password`,
            layer: "Service",
            status: "Error",
        });
    }
    const { password } = user, other = __rest(user, ["password"]);
    return other;
});
exports.fetchUserAtLogin = fetchUserAtLogin;
const fetchOneUserByEmail = (email, type) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.getOneUser)({ email: email });
    if (type === "login") {
        if (!user) {
            throw (0, error_1.default)({
                name: "User not found",
                code: 404,
                message: `Invalid email: ${email}`,
                layer: "Service",
                status: "Error",
            });
        }
        const { password } = user, other = __rest(user, ["password"]);
        return other;
    }
    else if (type === "signup") {
        if (user) {
            throw (0, error_1.default)({
                name: "User already registered",
                code: 404,
                message: `Try with an other email`,
                layer: "Service",
                status: "Error",
            });
        }
        return null;
    }
    throw (0, error_1.default)({
        name: "Bad type",
        code: 404,
        message: "Either login/signup req.body.type",
        layer: "Service",
        status: "Error",
    });
});
exports.fetchOneUserByEmail = fetchOneUserByEmail;
// export const toggleConfirmUser = async (id: string): Promise<IUser | null> => {
//   const user = (await fetchOneUserById({_id: id})) as IUser;
//   return await updateUser(id, { confirmed: !user.confirmed });
// };
const modifyAllowedAttrUser = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.fetchOneUserById)(id);
    if (!user) {
        throw (0, error_1.default)({
            name: "User not found",
            message: "User not found",
            code: 404,
            layer: "Service",
            status: "Error",
        });
    }
    return yield (0, user_repository_1.updateUser)(id, obj);
});
exports.modifyAllowedAttrUser = modifyAllowedAttrUser;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const _user = yield (0, user_repository_1.createUser)(user);
    return _user;
});
exports.addUser = addUser;
// export const deleteOneUser = async (id: string): Promise<void> => {
//   await fetchOneUserById(id);
//   await deleteUser(id);
// };
