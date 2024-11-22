const express = require("express");
const authRouter = require("./auth");
const helloRouter = require("./hello");
const questsRouter = require("./quests");
const achievementsRouter = require("./achievements");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/hello", helloRouter);
rootRouter.use("/player", questsRouter);
rootRouter.use("/quests", achievementsRouter);

module.exports = rootRouter;
