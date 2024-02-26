"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const corsConfig_1 = require("./config/corsConfig");
const swaggerConfig_1 = require("./config/swaggerConfig");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const PORT = envConfig_1.default.port;
const app = (0, express_1.default)();
/**Express server config */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/**Cors config, check corsConfig file to add auth urls */
app.use((0, cors_1.default)(corsConfig_1.corsOptions));
/**API documentation setup */
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.specs));
/**Routing setup middleware */
app.use("/api", index_1.default);
/**Response to non existing URLS */
app.get("*", (_, res) => {
    res.status(404).json({
        status: "ERROR",
        message: "Invalid URL",
    });
});
/**Error handler middleware */
app.use(errorHandler_middleware_1.default);
app.listen(PORT, () => {
    console.log("Server listening...");
});
