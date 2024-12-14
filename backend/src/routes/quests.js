const questsRouter = require("express").Router({ mergeParams: true });
const quests = require("../controllers/quests.controller");
const { tokenValidator } = require("../utils/middleware");

questsRouter.get("/active", tokenValidator, quests.getActiveQuestsController);
questsRouter.post("/", tokenValidator, quests.createQuestController);
questsRouter.delete("/:questId", tokenValidator, quests.deleteQuestController);
questsRouter.put("/:questId", tokenValidator, quests.updateQuestController);
questsRouter.put("/:questId/status", tokenValidator, quests.updateStatusQuestController);

module.exports = questsRouter;