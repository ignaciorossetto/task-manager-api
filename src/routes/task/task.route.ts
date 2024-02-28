import { Router } from "express";
import {
  addOneTask,
  deleteOneTask,
  getAllTasksFromUser,
  getOneTask,
  toggleCompletedTask,
  updateTask,
} from "../../controllers/task.controller";
import {
  fieldsParserMiddleware,
  newTaskParserMiddleware,
} from "../../middleware/task/taskParser.middleware";
import { idParserMiddleware } from "../../middleware/general.middleware";
import { jwtUserAuthMiddleware } from "../../middleware/auth/auth.middleware";

const router = Router();

/* GET ALL TASKS */
router.get(
  "/all/:id",
  idParserMiddleware,
  jwtUserAuthMiddleware,
  getAllTasksFromUser
);

/* GET ONE TASKS */
router.get("/one/:id", idParserMiddleware, jwtUserAuthMiddleware, getOneTask);

/** POST NEW TASK */
router.post("/", newTaskParserMiddleware, jwtUserAuthMiddleware, addOneTask);

/* UPDATE ONE TASKS (TITLE/DESCRIPTION) */
router.put(
  "/:id",
  idParserMiddleware,
  fieldsParserMiddleware,
  jwtUserAuthMiddleware,
  updateTask
);

/* UPDATE ONE TASKS (TOGGLE COMPLETE ATTRIBUTE)*/
router.put(
  "/toggle-complete/:id",
  idParserMiddleware,
  jwtUserAuthMiddleware,
  toggleCompletedTask
);

/* DELETE ONE TASKS */
router.delete("/:id", idParserMiddleware, jwtUserAuthMiddleware, deleteOneTask);

export default router;
