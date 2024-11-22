const questsRouter = require("express").Router();
const quests = require("../controllers/quests.controller");
const { tokenValidator } = require("../utils/middleware");

questsRouter.get("/:id/active-quests", tokenValidator, quests.getActiveQuestsController);
questsRouter.post("/:id/quests", tokenValidator, quests.createQuestController);
questsRouter.delete("/:id/quests/:questId", tokenValidator, quests.deleteQuestController);
questsRouter.put("/:id/quests/:questId", tokenValidator, quests.updateQuestController);

module.exports = questsRouter;
