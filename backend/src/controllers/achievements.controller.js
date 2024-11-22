const {
    getAchievements,
    getPlayerAchievements,
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
  
  module.exports = {
    getAchievementsListController,
    getUserAchievementsController,
  };  