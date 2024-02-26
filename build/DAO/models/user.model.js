"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userCollection = "user";
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    role: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model(userCollection, userSchema);
exports.default = UserModel;
