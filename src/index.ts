import express from "express";
import config from "./config/envConfig";
import errorHandler from "./middleware/errorHandler.middleware";
import ApiRouter from "./routes/index";
import cors from "cors";
import { corsOptions } from "./config/corsConfig";
import { specs } from "./config/swaggerConfig";
import swaggerUiExpress from "swagger-ui-express";

const PORT = config.port;
const app = express();

console.log(__dirname);

/**Express server config */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Cors config, check corsConfig file to add auth urls */
app.use(cors(corsOptions));

/**API documentation setup */
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

/**Routing setup middleware */
app.use("/api", ApiRouter);

/**Response to non existing URLS */
app.get("*", (_, res) => {
  res.status(404).json({
    status: "ERROR",
    message: "Invalid URL",
  });
});

/**Error handler middleware */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server listening...");
});
