const prisma = require("../lib/prisma");
require("express-async-errors");

const getNormalQuests = async (playerId) => {
  try{
    const player = await prisma.player.findUnique({
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
    console.log("quests: ", player.quests)
    return player.quests;
  }catch(error){
    console.error("Error fetching normal quests:", error);
    throw new Error("An unexpected error occurred while fetching normal quests.");
  }
};

const getDailyQuests = async (playerId) => {
  try{
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
  }catch(error){
    console.error("Error fetching daily quests:", error);
    throw new Error("An unexpected error occurred while fetching daily quests.");
  }
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
  try{
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
  }catch(error){
    console.error("Error updating game:", error);
    throw new Error("An unexpected error occurred while creating a quest.");
  }
};

const createRecurringQuest = async ({
  questId, 
  runAt,
}) => {
  try{
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
  }catch(error){
    console.error('Error creating quest:', error);
    throw new Error('An unexpected error occurred while creating a recurring quest.');
  }
}

const deleteQuest = async (id) => {
  try{
    const result = await prisma.quest.delete({
      where: {
        id: id
      }
    })
    return result;
  }catch(error){
    console.error("error deleting quest: ", error);
    throw new Error("An unexpected error occurred while deleting a quest");
  }
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
  findQuestById
};
