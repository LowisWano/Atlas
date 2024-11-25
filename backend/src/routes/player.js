const playerRouter = require("express").Router();
const questsRouter = require("./quests");

playerRouter.use("/:id/quests", questsRouter);

module.exports = playerRouter