const prisma = require("../lib/prisma");
require("express-async-errors");

const getQuests = async (playerId) => {
  const player = await prisma.player.findUnique({
    include: {
      quests: {
        where: {
          NOT: {
            questType: 'DAILY_QUEST'
          }
        },
        include: {
          reccurance: true
        }
      },
    },
    where: {
      id: playerId,
    },
  });
  console.log("quests: ", player.quests)
  return player.quests;
};

const getDailyQuests = async (playerId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.quest.findMany({
    where: {
      playerId,
      questType: 'DAILY_QUEST',
      createdAt: {
        gte: today
      }
    }
  });
};

const getCompletedQuests = async (playerId) => {
  return prisma.quest.findMany({
    where: {
      playerId,
      status: 'COMPLETED',
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const createPlayerQuest = async ({
  playerId,
  title,
  description,
  questType,
  dueDate,
  difficulty,
  gold,
  exp,
}) => {
  const quest = await prisma.quest.create({
    data: {
      title,
      description,
      questType,
      difficulty,
      dueDate,
      rewardGold: gold,
      rewardExp: exp,
      player: {
        connect: {
          id: playerId,
        },
      },
    },
    include: {
      player: true,
    },
  });
  return quest;
};

const createRecurringQuest = async (questData) => {
  const result = await prisma.$transaction(async (tx) => {
    const quest = await tx.quest.create({
      data: {
        playerId: questData.playerId,
        title: questData.title,
        description: questData.description,
        questType: questData.questType,
        difficulty: questData.difficulty,
        dueDate: questData.dueDate,
        rewardGold: questData.gold,
        rewardExp: questData.exp
      }
    });

    await tx.recurringQuest.create({
      data: {
        questId: quest.id,
        runAt: questData.runAt || new Date()
      }
    });

    return quest;
  });

  return result;
};

const deleteQuest = async (id) => { 
  const result = await prisma.quest.delete({
    where: {
      id: id
    }
  })
  return result;
}

const updateQuest = async (
  questId, 
  {
    title,
    description,
    dueDate,
    difficulty,
    gold,
    exp,
  },
) => {
  const result = await prisma.quest.update({
    where: {
      id: questId,
    },
    data: {
      title,
      description,
      difficulty,
      dueDate,
      rewardGold: gold,
      rewardExp: exp,
    }
  })
  return result;
}

const updateQuestStatus = async (questId, status) => {
  const result = await prisma.quest.update({
    where: {
      id: questId,
    },
    data: {
      status: status,
    }
  })

  return result;
}

const findQuestById = async (id) => {
  try{
    const quest = await prisma.quest.findUnique({
      where: {
        id: id,
      },
    });
    return quest;
  }catch(error){
    console.error("error fetching quest: ", error);
    throw new Error("An unexpected error occurred while fetching a quest");
  }
}

const checkAndCreateFirstQuestAchievement = async (playerId) => {
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
        title: 'First Normal Quest Completed',
      },
    });

    if (achievement) {
      await prisma.playerAchievement.create({
        data: {
          playerId: playerId,
          achievementId: achievement.id,
        },
      });
    }
  }
};

module.exports = {
  getQuests,
  getDailyQuests,
  getCompletedQuests,
  createPlayerQuest,
  createRecurringQuest,
  deleteQuest,
  findQuestById,
  updateQuest,
  updateQuestStatus,
  checkAndCreateFirstQuestAchievement,
};