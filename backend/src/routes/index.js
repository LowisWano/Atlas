const express = require("express");
const authRouter = require("./auth");
const helloRouter = require("./hello");
const playerRouter = require("./player")

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/hello", helloRouter);
rootRouter.use("/player", playerRouter);

module.exports = rootRouter;
