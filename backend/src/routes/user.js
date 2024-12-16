const userRouter = require("express").Router();
const { getUserController, updateUserController } = require("../controllers/user.controller");
const { tokenValidator } = require("../utils/middleware");

userRouter.get("/:userId", tokenValidator, getUserController);
userRouter.put("/:userId/username", tokenValidator, updateUserController);

module.exports = userRouter;