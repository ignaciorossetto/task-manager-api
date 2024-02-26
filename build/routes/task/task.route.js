"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../../controllers/task.controller");
const taskParser_middleware_1 = require("../../middleware/task/taskParser.middleware");
const general_middleware_1 = require("../../middleware/general.middleware");
const auth_middleware_1 = require("../../middleware/auth/auth.middleware");
const router = (0, express_1.Router)();
/* GET ALL TASKS */
router.get("/:id", general_middleware_1.idParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, task_controller_1.getAllTasksFromUser);
/* GET ONE TASKS */
router.get("/one/:id", general_middleware_1.idParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, task_controller_1.getOneTask);
/** POST NEW TASK */
router.post("/", taskParser_middleware_1.newTaskParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, task_controller_1.addOneTask);
/* UPDATE ONE TASKS (TITLE/DESCRIPTION) */
router.put("/:id", general_middleware_1.idParserMiddleware, taskParser_middleware_1.fieldsParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, task_controller_1.updateTask);
/* UPDATE ONE TASKS (TOGGLE COMPLETE ATTRIBUTE)*/
router.put("/toggle-complete/:id", general_middleware_1.idParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, task_controller_1.toggleCompletedTask);
/* DELETE ONE TASKS */
router.delete("/:id", general_middleware_1.idParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, task_controller_1.deleteOneTask);
exports.default = router;
