import { Router } from "express";
import TaskRouter from "./task/task.route";
import UserRouter from "./user/user.route";
const router = Router();

router.use("/task", TaskRouter);
router.use("/user", UserRouter);

export default router;
