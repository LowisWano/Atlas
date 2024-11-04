const prisma = require("../lib/prisma");

const fetchActiveQuests = async (playerId) => {
  const activeQuests = await prisma.player.findUnique({
    include: {
      quests: {
        where: {
          status: "ACTIVE",
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
  return activeQuests.quests;
};

const fetchScheduledQuests = async (playerId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const scheduledQuests = await prisma.player.findUnique({
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
  return scheduledQuests.quests;
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
