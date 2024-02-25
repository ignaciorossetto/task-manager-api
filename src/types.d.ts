import { Document, Model, Schema, Types } from "mongoose";

export interface IId {
  _id?: Types.ObjectId;
}

export interface ITask extends IID {
  title: string;
  description: string;
  completed?: boolean;
  ownerId: Types.ObjectId;
}

export interface CustomErrorOptions {
  name?: string;
  cause?: any;
  message: string;
  code?: number;
  status?: string;
  layer?: string;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface IUser extends IId {
  email: string;
  password: string;
  fullName?: string;
  confirmed: boolean;
  role: number;
}

export interface CustomErrorInstance extends Error, CustomErrorOptions {}
