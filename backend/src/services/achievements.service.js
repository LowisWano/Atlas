const prisma = require("../lib/prisma");
require("express-async-errors");

const getAchievements = async () => {
  const achievements = await prisma.achievement.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      rewardGold: true,
      rewardExp: true,
      iconImg: true,
    },
    orderBy: {
      title: 'asc',
    }
  });
  return achievements;
};

const getPlayerAchievements = async (playerId) => {
  const playerAchievements = await prisma.playerAchievement.findMany({
    where: {
      playerId: playerId,
    },
    include: {
      achievement: true,
    },
  });

  return playerAchievements;
};


module.exports = {
  getAchievements,
  getPlayerAchievements
};
