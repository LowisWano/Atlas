const achievementsRouter = require("express").Router();
const achievements = require("../controllers/achievements.controller");
const { tokenValidator } = require("../utils/middleware");

achievementsRouter.get("/list", tokenValidator, achievements.getAchievementsListController);
achievementsRouter.get("/:id/user-achievements", tokenValidator, achievements.getUserAchievementsController);
achievementsRouter.post("/:id/check-first-quest", tokenValidator, achievements.checkFirstQuestAchievementController);
achievementsRouter.post("/:id/check-first-main-quest", tokenValidator, achievements.checkFirstMainQuestAchievementController);
achievementsRouter.post("/:id/check-first-daily-quest", tokenValidator, achievements.checkFirstDailyQuestAchievementController);
achievementsRouter.post("/:id/check-first-purchase", tokenValidator, achievements.checkFirstPurchaseAchievementController);

module.exports = achievementsRouter;