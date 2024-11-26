const playerRouter = require("express").Router();
const questsRouter = require("./quests");
const profileRouter = require("./profile")
const purchasesRouter = require("./purchases")

playerRouter.use("/:id/quests", questsRouter);
playerRouter.use("/:id/profile", profileRouter);
playerRouter.use("/:id/purchase", purchasesRouter);

module.exports = playerRouter