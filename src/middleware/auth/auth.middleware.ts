import { NextFunction, Request, Response } from "express";
import { jwtExtractor, verifyToken } from "../../utils/utils";
import createCustomError from "../../utils/error";

export const jwtUserAuthMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const token = jwtExtractor(req);
    if (!token) {
      throw createCustomError({
        name: "Unauthorized",
        message: "Missing jwt token",
        code: 401,
        status: "Error",
        layer: "Auth Middleware",
      });
    }
    const verifiedToken = verifyToken(token);
    if (!verifiedToken) {
      throw createCustomError({
        name: "Unauthorized",
        message: "Invalid jwt token",
        code: 401,
        status: "Error",
        layer: "Auth Middleware",
      });
    }
  } catch (error) {
    next(error);
  }
  next();
};
