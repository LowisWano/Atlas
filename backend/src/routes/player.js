const playerRouter = require("express").Router();
const questsRouter = require("./quests");
const profileRouter = require("./profile")

playerRouter.use("/:id/quests", questsRouter);
playerRouter.use("/:id/profile", profileRouter);

module.exports = playerRouter