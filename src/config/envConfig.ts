import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "production");
program.parse();

const environment = program.opts().mode;

dotenv.config({
  path:
    environment == "test"
      ? "./.env.test"
      : environment == "dev"
      ? "./.env.dev"
      : "./.env.production",
});

export default {
  port: process.env.PORT || 8000,
  frontEndUrl: process.env.FRONTEND_URL_DEV,
  mongo_uri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
};
