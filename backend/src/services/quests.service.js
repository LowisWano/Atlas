const prisma = require("../lib/prisma");
require("express-async-errors");

const getNormalQuests = async (playerId) => {
  const player = await prisma.player.findUnique({
    include: {
      quests: {
        where: {
          questType: "NORMAL_QUEST"
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
      status: 'ACTIVE',
      createdAt: {
        gte: today
      }
    }
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

module.exports = {
  getNormalQuests,
  getDailyQuests,
  createPlayerQuest,
  createRecurringQuest,
  deleteQuest,
  findQuestById,
  updateQuest,
  updateQuestStatus,
};
