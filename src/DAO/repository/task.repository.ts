import mongoose from "mongoose";
import { ITask } from "../../types";
import config from "../../config/envConfig";
import TaskModel from "../models/task.model";
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

export const getAllTasks = async (
  _filter: Partial<ITask>
): Promise<ITask[]> => {
  await connectToDatabase();
  const filter = _filter ? _filter : {};
  return TaskModel.find(filter).lean().exec();
};

export const getOneTask = async (taskId: string): Promise<ITask | null> => {
  await connectToDatabase();
  return TaskModel.findById(taskId).exec();
};

export const updateTask = async (
  id: string,
  task: Partial<ITask>
): Promise<ITask | null> => {
  await connectToDatabase();
  return TaskModel.findByIdAndUpdate(id, task, { new: true }).exec();
};

export const createTask = async (task: ITask): Promise<ITask> => {
  await connectToDatabase();
  return TaskModel.create(task);
};

export const deleteTask = async (id: string): Promise<void> => {
  await connectToDatabase();
  await TaskModel.findByIdAndDelete(id).exec();
};
