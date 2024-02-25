import { CustomErrorInstance, ITask } from "../types";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getOneTask,
  updateTask,
} from "../DAO/repository/task.repository";
import createCustomError from "../utils/error";

export const fetchAllTasks = async (): Promise<ITask[]> => {
  return getAllTasks();
};

export const fetchOneTask = async (id: string): Promise<ITask | null> => {
  const task = await getOneTask(id);
  if (!task) {
    throw createCustomError({
      name: "Task not found",
      code: 404,
      message: `Invalid id: ${id}`,
      layer: "Service",
      status: "Error",
    });
  }
  return task;
};

export const toggleCompleteTask = async (id: string): Promise<ITask | null> => {
  const task = (await fetchOneTask(id)) as ITask;
  return await updateTask(id, { completed: !task.completed });
};

export const modifyTitleDescrOfTask = async (
  id: string,
  obj: Partial<ITask>
): Promise<ITask | null | CustomErrorInstance> => {
  const task = await fetchOneTask(id);
  if (!task) {
    return createCustomError({
      name: "Task not found",
      message: "Task not found",
      code: 404,
      layer: "Service",
      status: "Error",
    });
  }
  return await updateTask(id, obj);
};

export const addTask = async (task: ITask): Promise<ITask | null> => {
  const _task: ITask = await createTask(task);
  return _task;
};

export const deleteOneTask = async (id: string): Promise<void> => {
  await fetchOneTask(id);
  await deleteTask(id);
};
