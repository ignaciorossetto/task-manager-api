"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCustomError = ({ name = "Error", cause, message, code = 1, status = "500", layer, }) => {
    const error = new Error(message);
    error.name = name;
    error.code = code;
    error.status = status;
    error.cause = cause;
    error.layer = layer;
    return Object.setPrototypeOf(error, Object.prototype);
};
exports.default = createCustomError;
