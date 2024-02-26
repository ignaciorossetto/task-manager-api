import { NextFunction, Request, Response } from "express";
import * as taskService from "../services/task.service";
// import { toNewTaskNoId } from "../utils/utils";
import { ITask } from "../types";
import { Types } from "mongoose";

export const getAllTasksFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: unknown = req.params.id;
    const tasks = await taskService.fetchAllTasks({
      ownerId: id as Types.ObjectId,
    });
    res.json({
      status: "OK",
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  try {
    const tasks = await taskService.fetchOneTask(id);
    res.json({
      status: "OK",
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const addOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task: ITask = {
      title: req.body.title,
      description: req.body.description,
      completed: false,
      ownerId: req.body.ownerId,
    };
    const newTask = await taskService.addTask(task);
    res.json({
      status: "OK",
      payload: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const title = { title: req.body.title } || undefined;
  const description = { description: req.body.description } || undefined;
  const obj: Partial<ITask> = { ...title, ...description };
  try {
    const updatedTask = await taskService.modifyTitleDescrOfTask(id, obj);
    res.json({
      status: "OK",
      payload: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleCompletedTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  try {
    const updatedTask = await taskService.toggleCompleteTask(id);
    // cubrir que venga null
    res.json({
      status: "OK",
      payload: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    await taskService.deleteOneTask(id);
    res.json({
      status: "OK",
      payload: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};
