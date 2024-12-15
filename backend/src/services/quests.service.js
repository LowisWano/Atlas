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

const earnPlayerRewards = async (playerId, gold, exp, questStatus) => {
  const result = await prisma.$transaction(async (tx) => {
    const player = await tx.player.findUnique({
      where: { id: playerId }
    });

    if (!player) {
      throw new Error('Player not found');
    }

    const goldMod = questStatus === 'COMPLETED' ? -gold : gold;
    const expMod = questStatus === 'COMPLETED' ? -exp : exp;
    const rankPointsMod = questStatus === 'COMPLETED' ? -1 : 1;

    const newGold = Math.max(0, player.gold + goldMod);
    let newExp = Math.max(0, player.experience + expMod);
    let currentLevel = player.level;

    // Check for level up
    const nextLevelThreshold = currentLevel * 1000;
    while (newExp >= nextLevelThreshold) {
      currentLevel += 1;
      newExp -= nextLevelThreshold;
    }

    const newRankPoints = Math.max(0, player.rankPoints + rankPointsMod);
    let newRank = player.adventurerRank;

    if (newRankPoints >= 1000) newRank = 'ADAMANTITE';
    else if (newRankPoints >= 800) newRank = 'MYTHRIL';
    else if (newRankPoints >= 600) newRank = 'PLATINUM';
    else if (newRankPoints >= 400) newRank = 'GOLD';
    else if (newRankPoints >= 200) newRank = 'SILVER';
    else if (newRankPoints >= 100) newRank = 'IRON';
    else newRank = 'COPPER';

    return await tx.player.update({
      where: { id: playerId },
      data: {
        gold: newGold,
        experience: newExp,
        level: currentLevel,
        rankPoints: newRankPoints,
        adventurerRank: newRank
      }
    });
  });

  return result;
};

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
  getQuests,
  getDailyQuests,
  createPlayerQuest,
  createRecurringQuest,
  deleteQuest,
  findQuestById,
  updateQuest,
  updateQuestStatus,
  earnPlayerRewards
};
