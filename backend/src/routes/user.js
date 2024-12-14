const userRouter = require("express").Router();
const { getUserController } = require("../controllers/user.controller");
const { tokenValidator } = require("../utils/middleware");

userRouter.get("/:userId", tokenValidator, getUserController);

module.exports = userRouter;