const prisma = require('../lib/prisma')
require('express-async-errors');
const { calculateRewards } = require('../utils/utils')

const getAllQuests = async (req, res) => {
  const quests = await prisma.quest.findMany({
    include:{
      player: true
    }
  });

  res.json(quests);
}

const createQuest = async (req, res) => {
  const { title, description, questType, dueDate, difficulty } = req.body;

  const { gold, exp } = calculateRewards(questType, difficulty);

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
          id: req.user.id
        }
      }
    },
    include: {
      player: true
    }
  });

  res.json(quest);
}

module.exports = {
  getAllQuests,
  createQuest
}