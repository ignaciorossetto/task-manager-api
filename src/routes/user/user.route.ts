import { Router } from "express";
import {
  fieldsParserMiddleware,
  newUserParserMiddleware,
} from "../../middleware/user/userParser.middleware";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../../controllers/user.controller";
import { idParserMiddleware } from "../../middleware/general.middleware";
import { jwtUserAuthMiddleware } from "../../middleware/auth/auth.middleware";

const router = Router();

/** GET ALL Users confirm (by ADMIN)*/
//missing jwt user role 1 middleware
router.get("/", getAllUsers);

/** Update ONLY fullname (by USER)*/
//missing jwt user role 0 middleware
router.get("/:id", idParserMiddleware, jwtUserAuthMiddleware, getOneUser);

/** Update ONLY fullname (by USER)*/
//missing jwt user role 0 middleware
router.put("/:id", idParserMiddleware, fieldsParserMiddleware, updateUser);

/** Update ONLY confirm (by ADMIN)*/
//missing jwt user role 1 middleware
router.put("/:id", idParserMiddleware, fieldsParserMiddleware, updateUser);

router.post("/sign-up", newUserParserMiddleware, createUser);

export default router;
