import { Router } from "express";
import {
  addOneTask,
  deleteOneTask,
  getAllTasks,
  getOneTask,
  toggleCompletedTask,
  updateTask,
} from "../../controllers/task.controller";
import {
  fieldsParserMiddleware,
  newTaskParserMiddleware,
} from "../../middleware/task/taskParser.middleware";
import { idParserMiddleware } from "../../middleware/general.middleware";

const router = Router();

/* GET ALL TASKS */
router.get("/", getAllTasks);

/* GET ONE TASKS */
router.get("/:id", idParserMiddleware, getOneTask);

/** POST NEW TASK */
router.post("/", newTaskParserMiddleware, addOneTask);

/* UPDATE ONE TASKS (TITLE/DESCRIPTION) */
router.put("/:id", idParserMiddleware, fieldsParserMiddleware, updateTask);

/* UPDATE ONE TASKS (TOGGLE COMPLETE ATTRIBUTE)*/
router.put("/toggle-complete/:id", idParserMiddleware, toggleCompletedTask);

/* DELETE ONE TASKS */
router.delete("/:id", idParserMiddleware, deleteOneTask);

export default router;
