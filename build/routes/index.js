"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_route_1 = __importDefault(require("./task/task.route"));
const user_route_1 = __importDefault(require("./user/user.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const router = (0, express_1.Router)();
router.use("/task", task_route_1.default);
router.use("/user", user_route_1.default);
router.use("/auth", auth_route_1.default);
exports.default = router;
