import { NextFunction, Request, Response } from "express";
import { CustomErrorInstance } from "../types";

export default (
  error: CustomErrorInstance,
  _req: Request,
  res: Response,
  _: NextFunction
) => {
  const code = error.code || 500;
  res.status(code).json({
    status: "Error",
    error: error.name || "unhandled",
    code: error.code,
    message: error.message || "",
    layer: error.layer || "",
  });
};
