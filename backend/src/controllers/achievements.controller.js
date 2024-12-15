const {
  getAchievements,
  getPlayerAchievements,
  checkAndCreateFirstQuestAchievement,
} = require("../services/achievements.service");
require("express-async-errors");

const getAchievementsListController = async (req, res) => {
  const achievements = await getAchievements();
  res.json(achievements);
};

const getUserAchievementsController = async (req, res) => {
  const playerId = Number(req.params.id);
  const playerAchievements = await getPlayerAchievements(playerId);
  res.json(playerAchievements);
};

const checkFirstQuestAchievementController = async (req, res) => {
  const playerId = Number(req.params.id);
  await checkAndCreateFirstQuestAchievement(playerId);
  res.status(200).send("Achievement check completed");
};

module.exports = {
  getAchievementsListController,
  getUserAchievementsController,
  checkFirstQuestAchievementController,
};