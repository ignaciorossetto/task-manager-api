"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const commander_1 = require("commander");
const program = new commander_1.Command();
program.option("--mode <mode>", "Modo de trabajo", "production");
program.parse();
const environment = program.opts().mode;
dotenv_1.default.config({
    path: environment == "test"
        ? "./.env.test"
        : environment == "dev"
            ? "./.env.dev"
            : "./.env.production",
});
exports.default = {
    port: process.env.PORT || 8000,
    frontEndUrl: process.env.FRONTEND_URL_DEV,
    mongo_uri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
};
