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
    include: {
      achievement: {
        select: {
          id: true,
          title: true,
          description: true,
          rewardGold: true,
          rewardExp: true,
          iconImg: true,
        },
      },
    },
    where: {
      playerId: playerId,
    },
  });

  console.log("Query result:", playerAchievements);

  return playerAchievements.map((entry) => ({
    obtainedAt: entry.createdAt,
    ...entry.achievement,
  }));
};

module.exports = {
  getAchievements,
  getPlayerAchievements
};
