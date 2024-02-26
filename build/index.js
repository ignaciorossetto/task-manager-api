"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (_, res) => {
    res.json({
        status: 'OK',
        payload: 'endpoint hitted'
    });
});
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
