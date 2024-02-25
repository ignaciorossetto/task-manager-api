import { NextFunction, Request, Response } from "express";
import { IUser } from "../types";
import { createHash } from "../utils/utils";
import * as UserService from "../services/user.service";
import { Types } from "mongoose";
import createCustomError from "../utils/error";

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.fetchAllUsers();
    res.json({
      status: "OK",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: unknown = req.params.id;
    const users = await UserService.fetchOneUserById(id as Types.ObjectId);
    res.json({
      status: "OK",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body;
    await UserService.fetchOneUserByEmail(user.email, "signup");
    const hashedPassword = createHash(user.password);
    user.password = hashedPassword;
    await UserService.addUser(user);
    res.json({
      status: "OK",
      message: "User signed up successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: unknown = req.params.id;
  const obj: Partial<IUser> = req.body;
  try {
    const user = await UserService.modifyAllowedAttrUser(
      id as Types.ObjectId,
      obj
    );
    if (!user) {
      throw createCustomError({
        name: "User not found",
        message: "User not found",
        code: 404,
        layer: "Controller",
      });
    }
    res.json({
      status: "OK",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
