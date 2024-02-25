import { IUser, Ilogin } from "../types";
import createCustomError from "./error";
import bcrypt from "bcrypt";

const isString = (string: any): boolean => {
  return typeof string === "string";
};

export const parseNewTaskBody = (value: string): boolean => {
  if (!isString(value)) {
    throw createCustomError({
      name: "Invalid task body",
      code: 422,
      message: "Invalid type or empty title/description",
      layer: "Controller",
      status: "Error",
    });
  }
  return true;
};

export const parseNewUserBody = (user: IUser) => {
  const throwError = (value: string, code: number) => {
    throw createCustomError({
      name: "Invalid user body",
      code: code,
      message: value,
      layer: "Controller",
      status: "Error",
    });
  };

  if (!user.email || !user.password || !user.fullName) {
    throwError("Missing email/password/fullName", 400);
  }

  if (!isString(user.email)) {
    throwError("Invalid type or empty email", 422);
  } else if (!isString(user.password)) {
    throwError("Invalid type or empty password", 422);
  } else if (!isString(user.fullName)) {
    throwError("Invalid type or empty fullName", 422);
  } else return true;
  return true;
};

export const createHash = (password: string) => {
  const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hashedPass;
};

export const isValidPassword = (user: Ilogin, password: string) => {
  const comparedPass = bcrypt.compareSync(password, user.password);
  return comparedPass;
};
