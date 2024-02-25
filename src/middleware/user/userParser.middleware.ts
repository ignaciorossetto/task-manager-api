import { NextFunction, Request, Response } from "express";
import { parseNewTaskBody, parseNewUserBody } from "../../utils/utils";
import createCustomError from "../../utils/error";
import { IUser } from "../../types";

export const newUserParserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const user: IUser = req.body;
  parseNewUserBody(user);
  return next();
};

export const fieldsParserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const fullName = req.body.fullName;
  if (fullName) {
    fullName && parseNewTaskBody(fullName);
    next();
  } else {
    throw createCustomError({
      name: "Invalid req body",
      code: 400,
      message: "Missing fullName",
      layer: "Controller",
      status: "Error",
    });
  }
};
