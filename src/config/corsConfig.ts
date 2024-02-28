import { CorsOptions } from "cors";
import config from "./envConfig";

const allowedOrigins = [
  config.frontEndUrl,
  "http://localhost:3000",
  "http://localhost:5173",
  "https://task-manager-six-sand.vercel.app",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};
