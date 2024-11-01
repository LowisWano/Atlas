const { fetchPlayerQuests, savePlayerQuest } = require('../services/quests.service');
require('express-async-errors');
const { calculateRewards } = require('../utils/utils')

const getPlayerQuests = async (req, res) => {
  const id = Number(req.params.id);
  const quests = await fetchPlayerQuests(id);
  res.json(quests);
}

const createQuest = async (req, res) => {
  const { title, description, questType, dueDate, difficulty } = req.body;
  const { gold, exp } = calculateRewards(questType, difficulty);
  const quest = await savePlayerQuest({
    playerId: req.user.id,
    title,
    description,
    questType,
    dueDate,
    difficulty,
    gold,
    exp
  })
  res.json(quest);
}

module.exports = {
  getPlayerQuests,
  createQuest
}