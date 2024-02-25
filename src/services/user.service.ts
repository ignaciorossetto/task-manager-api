import { IUser } from "../types";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../DAO/repository/user.repository";
import createCustomError from "../utils/error";
import { Types } from "mongoose";

export const fetchAllUsers = async (): Promise<IUser[]> => {
  return getAllUsers();
};

export const fetchOneUserById = async (
  id: Types.ObjectId,
  type: string = "other"
): Promise<Partial<IUser> | null> => {
  const user = await getOneUser({ _id: id });
  if (!user) {
    throw createCustomError({
      name: "User not found",
      code: 404,
      message: `Invalid id: ${id}`,
      layer: "Service",
      status: "Error",
    });
  } else if (type === "signup" && user) {
    throw createCustomError({
      name: "User already registered",
      code: 404,
      message: `Try with an other email`,
      layer: "Service",
      status: "Error",
    });
  }
  const { password, ...other } = user;
  return other;
};

export const fetchOneUserByEmail = async (
  email: string,
  type: "login" | "signup"
): Promise<Partial<IUser> | null> => {
  const user = await getOneUser({ email: email });
  if (type === "login") {
    if (!user) {
      throw createCustomError({
        name: "User not found",
        code: 404,
        message: `Invalid email: ${email}`,
        layer: "Service",
        status: "Error",
      });
    }
    const { password, ...other } = user;
    return other;
  } else if (type === "signup") {
    if (user) {
      throw createCustomError({
        name: "User already registered",
        code: 404,
        message: `Try with an other email`,
        layer: "Service",
        status: "Error",
      });
    }
    return null;
  }
  throw createCustomError({
    name: "Bad type",
    code: 404,
    message: "Either login/signup req.body.type",
    layer: "Service",
    status: "Error",
  });
};

// export const toggleConfirmUser = async (id: string): Promise<IUser | null> => {
//   const user = (await fetchOneUserById({_id: id})) as IUser;
//   return await updateUser(id, { confirmed: !user.confirmed });
// };

export const modifyAllowedAttrUser = async (
  id: Types.ObjectId,
  obj: Partial<IUser>
): Promise<IUser | null> => {
  const user = await fetchOneUserById(id);
  if (!user) {
    throw createCustomError({
      name: "User not found",
      message: "User not found",
      code: 404,
      layer: "Service",
      status: "Error",
    });
  }
  return await updateUser(id, obj);
};

export const addUser = async (user: IUser): Promise<IUser | null> => {
  const _user: IUser = await createUser(user);
  return _user;
};

// export const deleteOneUser = async (id: string): Promise<void> => {
//   await fetchOneUserById(id);
//   await deleteUser(id);
// };
