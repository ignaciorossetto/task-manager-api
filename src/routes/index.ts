import { Router } from "express";
import TaskRouter from "./task/task.route";
import UserRouter from "./user/user.route";
import AuthRouter from "./auth/auth.route";
const router = Router();

router.use("/task", TaskRouter);
router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
