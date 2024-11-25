const express = require("express");
const authRouter = require("./auth");
const helloRouter = require("./hello");
const playerRouter = require("./player")
const shopRouter = require("./items");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/hello", helloRouter);
rootRouter.use("/player", playerRouter);
rootRouter.use("/items", shopRouter);

module.exports = rootRouter;
