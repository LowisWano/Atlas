const questsRouter = require("express").Router();
const quests = require("../controllers/quests.controller");
const { userExtractor } = require("../utils/middleware");

questsRouter.get("/:id/active-quests", userExtractor, quests.getActiveQuests);
questsRouter.post("/:id/quests", userExtractor, quests.createQuest);

module.exports = questsRouter;
