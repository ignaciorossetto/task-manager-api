"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (error, _req, res, _) => {
    const code = error.code || 500;
    res.status(code).json({
        status: "Error",
        error: error.name || "unhandled",
        code: error.code,
        message: error.message || "",
        layer: error.layer || "",
    });
};
