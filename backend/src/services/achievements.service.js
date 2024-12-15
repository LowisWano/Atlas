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

const checkAndCreateFirstQuestAchievement = async (playerId) => {
  // Check if the player already has the "First Normal Quest Completed" achievement
  const existingAchievement = await prisma.playerAchievement.findFirst({
    where: {
      playerId: playerId,
      achievement: {
        id:1,
      },
    },
  });

  if (existingAchievement) {
    // Achievement already exists, no need to create a new one
    return;
  }

  // Find the first completed normal quest
  const completedNormalQuest = await prisma.quest.findFirst({
    where: {
      playerId: playerId,
      questType: 'NORMAL_QUEST',
      status: 'COMPLETED',
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (completedNormalQuest) {
    const achievement = await prisma.achievement.findFirst({
      where: {
        id:1,
      },
    });

    if (achievement) {
      await prisma.$transaction(async (tx) => {
        // Create the player achievement
        await tx.playerAchievement.create({
          data: {
            playerId: playerId,
            achievementId: achievement.id,
          },
        });

        // Update the player's gold and rank points
        await tx.player.update({
          where: {
            id: playerId,
          },
          data: {
            gold: {
              increment: achievement.rewardGold,
            },
            rankPoints: {
              increment: achievement.rewardExp,
            },
          },
        });
      });
    }
  }
};

const checkAndCreateFirstMainQuestAchievement = async (playerId) => {
  // Check if the player already has the "First Main Quest Completed" achievement
  const existingAchievement = await prisma.playerAchievement.findFirst({
    where: {
      playerId: playerId,
      achievement: {
        id: 4,
      },
    },
  });

  if (existingAchievement) {
    // Achievement already exists, no need to create a new one
    return;
  }

  // Find the first completed main quest
  const completedMainQuest = await prisma.quest.findFirst({
    where: {
      playerId: playerId,
      questType: 'MAIN_QUEST',
      status: 'COMPLETED',
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (completedMainQuest) {
    const achievement = await prisma.achievement.findFirst({
      where: {
        id: 4,
      },
    });

    if (achievement) {
      await prisma.$transaction(async (tx) => {
        // Create the player achievement
        await tx.playerAchievement.create({
          data: {
            playerId: playerId,
            achievementId: achievement.id,
          },
        });

        // Update the player's gold and rank points
        await tx.player.update({
          where: {
            id: playerId,
          },
          data: {
            gold: {
              increment: achievement.rewardGold,
            },
            rankPoints: {
              increment: achievement.rewardExp,
            },
          },
        });
      });
    }
  }
};

module.exports = {
  getAchievements,
  getPlayerAchievements,
  checkAndCreateFirstQuestAchievement,
  checkAndCreateFirstMainQuestAchievement,
};