"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        info: {
            title: "TODO WebApp Docs",
            description: "Documentacion oficial de E-commerce",
            version: "V 1.0",
        },
    },
    apis: [`${__dirname}/../docs/**/*.yaml`],
};
exports.specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
