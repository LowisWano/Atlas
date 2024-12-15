const {
  getAchievements,
  getPlayerAchievements,
  checkAndCreateFirstQuestAchievement,
  checkAndCreateFirstMainQuestAchievement,
  checkAndCreateFirstDailyQuestAchievement,
  checkAndCreateFirstPurchaseAchievement,
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

const checkFirstMainQuestAchievementController = async (req, res) => {
  const playerId = Number(req.params.id);
  await checkAndCreateFirstMainQuestAchievement(playerId);
  res.status(200).send("Achievement check completed");
};

const checkFirstDailyQuestAchievementController = async (req, res) => {
  const playerId = Number(req.params.id);
  await checkAndCreateFirstDailyQuestAchievement(playerId);
  res.status(200).send("Achievement check completed");
};

const checkFirstPurchaseAchievementController = async (req, res) => {
  const playerId = Number(req.params.id);
  await checkAndCreateFirstPurchaseAchievement(playerId);
  res.status(200).send("Achievement check completed");
};

module.exports = {
  getAchievementsListController,
  getUserAchievementsController,
  checkFirstQuestAchievementController,
  checkFirstMainQuestAchievementController,
  checkFirstDailyQuestAchievementController,
  checkFirstPurchaseAchievementController,
};