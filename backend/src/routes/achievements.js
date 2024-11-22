const achievementsRouter = require("express").Router();
const achievements = require("../controllers/achievements.controller");
const { tokenValidator } = require("../utils/middleware");

achievementsRouter.get("/list", tokenValidator, achievements.getAchievementsListController);
achievementsRouter.get("/:id/user-achievements", tokenValidator, achievements.getUserAchievementsController);

module.exports = achievementsRouter;
