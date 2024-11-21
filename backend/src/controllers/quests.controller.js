const {
  getNormalQuests,
  getDailyQuests,
  createPlayerQuest,
  createRecurringQuest
} = require("../services/quests.service");
require("express-async-errors");
const { calculateRewards } = require("../utils/utils");

const getActiveQuestsController = async (req, res) => {
  const playerId = Number(req.params.id);
  const normalQuests = await getNormalQuests(playerId);
  const dailyQuests = await getDailyQuests(playerId);
  const activeQuests = normalQuests.concat(dailyQuests)
  res.json(activeQuests);
};

const createQuestController = async (req, res) => {
  const { title, description, questType, dueDate, difficulty } = req.body;
  const { gold, exp } = calculateRewards(questType, difficulty);
  const quest = await createPlayerQuest({
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
    const recurringQuest = await createRecurringQuest({
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
