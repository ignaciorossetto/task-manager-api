import { NextFunction, Request, Response } from "express";
import createCustomError from "../utils/error";
import { generateToken } from "../utils/utils";
import * as UserService from "../services/user.service";

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createCustomError({
        name: "Bad login request",
        code: 404,
        layer: "Controller",
        status: "Error",
        message: "Missing email or password",
      });
    }
    const user = await UserService.fetchUserAtLogin(email, password);
    const token = generateToken(user);
    res.json({
      status: "OK",
      payload: user,
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
};
