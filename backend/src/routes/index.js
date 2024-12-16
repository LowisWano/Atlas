const express = require("express");
const authRouter = require("./auth");
const helloRouter = require("./hello");
const playerRouter = require("./player")
const userRouter = require("./user");
const shopRouter = require("./items");
const questsRouter = require("./quests");
const achievementsRouter = require("./achievements");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/hello", helloRouter);
rootRouter.use("/player", playerRouter);
rootRouter.use("/items", shopRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/achievements", achievementsRouter);

module.exports = rootRouter;
