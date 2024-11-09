const {
  fetchActiveQuests,
  fetchScheduledQuests,
  savePlayerQuest,
  saveRecurringQuest,
} = require("../services/quests.service");
require("express-async-errors");
const { calculateRewards } = require("../utils/utils");

const getActiveQuestsController = async (req, res) => {
  const playerId = Number(req.params.id);
  const normalQuests = await fetchActiveQuests(playerId);
  const scheduledQuests = await fetchScheduledQuests(playerId);
  const activeQuests = normalQuests.concat(scheduledQuests)
  res.json(activeQuests);
};

const createQuestController = async (req, res) => {
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
    exp,
  });

  if(questType === 'DAILY_QUEST'){
    const { frequency, runAt } = req.body
    // add validation if values exist
    const recurringQuest = await saveRecurringQuest({
      questId: quest.id, 
      frequency, 
      runAt,
    });
  }

  res.json(quest);
};

module.exports = {
  getActiveQuestsController,
  createQuestController,
};
