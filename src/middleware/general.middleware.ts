import { Types } from "mongoose";
import createCustomError from "../utils/error";
import { NextFunction, Request, Response } from "express";

export const idParserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const id: unknown = req.params.id;
  if (!id) {
    throw createCustomError({
      name: "Missing id parameter",
      code: 400,
      message: "Missing id parameter",
      layer: "Controller",
      status: "Error",
    });
  }

  const objectId = id as Types.ObjectId;
  if (!Types.ObjectId.isValid(objectId)) {
    throw createCustomError({
      name: "Invalid id parameter",
      code: 422,
      message: "Invalid id parameter",
      layer: "Controller",
      status: "Error",
    });
  }
  next();
};
