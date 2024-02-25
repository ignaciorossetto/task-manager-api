import { NextFunction, Request, Response } from "express";
import { parseNewTaskBody } from "../../utils/utils";
import createCustomError from "../../utils/error";

export const newTaskParserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const title = req.body.title;
  const description = req.body.description;
  if (!title || !description) {
    throw createCustomError({
      name: "Invalid task body",
      code: 400,
      message: "Missing title/description",
      layer: "Controller",
      status: "Error",
    });
  }
  parseNewTaskBody(title);
  parseNewTaskBody(description);
  return next();
};

export const fieldsParserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const description = req.body.description;
  if (title || description) {
    title && parseNewTaskBody(title);
    description && parseNewTaskBody(description);
    next();
  } else {
    throw createCustomError({
      name: "Invalid task body",
      code: 400,
      message: "Missing title/description/completed",
      layer: "Controller",
      status: "Error",
    });
  }
};
