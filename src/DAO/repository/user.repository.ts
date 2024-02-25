import mongoose, { FlattenMaps, Types } from "mongoose";
import { IUser } from "../../types";
import config from "../../config/envConfig";
import UserModel from "../models/user.model";
import createCustomError from "../../utils/error";

const connectToDatabase = async () => {
  const url = config.mongo_uri as string;
  try {
    await mongoose.connect(url);
  } catch (error) {
    throw createCustomError({
      name: "DB error",
      message: "Error connecting to database",
      layer: "Repository",
      code: 500,
      status: "Error",
    });
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  await connectToDatabase();
  return UserModel.find().exec();
};

export const getOneUser = async (
  obj: Partial<IUser>
): Promise<FlattenMaps<IUser> | null> => {
  await connectToDatabase();
  const user = await UserModel.findOne(obj).lean();
  return user;
};

export const updateUser = async (
  id: Types.ObjectId,
  user: Partial<IUser>
): Promise<IUser | null> => {
  await connectToDatabase();
  return UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
};

export const createUser = async (user: IUser): Promise<IUser> => {
  await connectToDatabase();
  return UserModel.create(user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await connectToDatabase();
  await UserModel.findByIdAndDelete(id).exec();
};
