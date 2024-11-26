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
  const endOfToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const player = await prisma.player.findUnique({
    include: {
      quests: {
        where: {
          status: "ACTIVE",
          questType: "DAILY_QUEST",
          reccurance: {
            runAt: {
              gte: today,
              lt: endOfToday,
            },
          },
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
  return player.quests;
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

const createRecurringQuest = async ({
  questId, 
  runAt,
}) => {
  const recurringQuest = await prisma.recurringQuest.create({
    data: {
      quest: {
        connect: {
          id: questId,
        },
      },
      runAt
    }
  })

  return recurringQuest;
}

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
