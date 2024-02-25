import mongoose from "mongoose";
import { IUser } from "../../types";

const userCollection = "user";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>(userCollection, userSchema);

export default UserModel;
