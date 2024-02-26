"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userParser_middleware_1 = require("../../middleware/user/userParser.middleware");
const user_controller_1 = require("../../controllers/user.controller");
const general_middleware_1 = require("../../middleware/general.middleware");
const auth_middleware_1 = require("../../middleware/auth/auth.middleware");
const router = (0, express_1.Router)();
/** GET ALL Users confirm (by ADMIN)*/
//missing jwt user role 1 middleware
router.get("/", user_controller_1.getAllUsers);
/** Update ONLY fullname (by USER)*/
//missing jwt user role 0 middleware
router.get("/:id", general_middleware_1.idParserMiddleware, auth_middleware_1.jwtUserAuthMiddleware, user_controller_1.getOneUser);
/** Update ONLY fullname (by USER)*/
//missing jwt user role 0 middleware
router.put("/:id", general_middleware_1.idParserMiddleware, userParser_middleware_1.fieldsParserMiddleware, user_controller_1.updateUser);
/** Update ONLY confirm (by ADMIN)*/
//missing jwt user role 1 middleware
router.put("/:id", general_middleware_1.idParserMiddleware, userParser_middleware_1.fieldsParserMiddleware, user_controller_1.updateUser);
router.post("/sign-up", userParser_middleware_1.newUserParserMiddleware, user_controller_1.createUser);
exports.default = router;
