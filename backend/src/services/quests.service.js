const prisma = require("../lib/prisma");

const fetchActiveQuests = async (playerId) => {
  const quests = await prisma.player.findUnique({
    include: {
      quests: {
        where: {
          status: "ACTIVE",
        },
      },
    },
    where: {
      id: playerId,
    },
  });
  return quests;
};

const fetchScheduledQuests = async (playerId) => {
  const scheduledQuests = await prisma.recurringQuest.findMany({
    where: {
      quest: {
        playerId: playerId,
      },
      runAt: {
        equals: new Date(),
      },
    },
    include: {
      quest: true,
    },
  });
  return scheduledQuests;
};

const savePlayerQuest = async ({
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

const saveRecurringQuest = async ({
  questId, 
  frequency, 
  runAt,
}) => {
  const recurringQuest = await prisma.recurringQuest.create({
    data: {
      quest: {
        connect: {
          id: questId,
        },
      },
      frequency,
      runAt
    }
  })

  return recurringQuest;
}

module.exports = {
  fetchActiveQuests,
  fetchScheduledQuests,
  savePlayerQuest,
  saveRecurringQuest
};
