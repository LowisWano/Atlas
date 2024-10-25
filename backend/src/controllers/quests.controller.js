const prisma = require('../lib/prisma')
require('express-async-errors');
const { calculateRewards } = require('../utils/utils')

const getPlayerQuests = async (req, res) => {
  const id = Number(req.params.id);
  const quests = await prisma.player.findUnique({
    include:{
      quests: true
    },
    where: {
      id: id,
    },
  })

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
  getPlayerQuests,
  createQuest
}