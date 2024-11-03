const questsRouter = require("express").Router();
const quests = require("../controllers/quests.controller");
const { userExtractor } = require("../utils/middleware");

questsRouter.get("/:id/active-quests", userExtractor, quests.getActiveQuestsController);
questsRouter.post("/:id/quests", userExtractor, quests.createQuestController);
quests.Router.post("/:id/recurring-quests", userExtractor, quests.createRecurringQuestController);

module.exports = questsRouter;
