const {
  getNormalQuests,
  getDailyQuests,
  createPlayerQuest,
  createRecurringQuest,
  deleteQuest,
  findQuestById,
  updateQuest,
} = require("../services/quests.service");
require("express-async-errors");
const { calculateRewards } = require("../utils/utils");

const getActiveQuestsController = async (req, res) => {
  const playerId = req.user.id;
  const normalQuests = await getNormalQuests(playerId);
  const dailyQuests = await getDailyQuests(playerId);
  const activeQuests = normalQuests.concat(dailyQuests);
  res.json(activeQuests);
};

const createQuestController = async (req, res) => {
  const playerId = Number(req.params.id);
  if (playerId != req.user.id)
    return res.status(401).json({ error: "Access denied. Unauthorized user." });

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

  if (questType === "DAILY_QUEST") {
    const { frequency, runAt } = req.body;
    // add validation if values exist
    const recurringQuest = await createRecurringQuest({
      questId: quest.id,
      frequency,
      runAt,
    });
  }

  res.json(quest);
};

const deleteQuestController = async (req, res) => {
  const playerId = Number(req.params.id);
  const questId = Number(req.params.questId);

  const quest = await findQuestById(questId);

  if (!quest) return res.status(404).json({ error: "Quest not found." });

  if (req.user.id != playerId || req.user.id != quest.playerId)
    return res.status(401).json({ error: "Access denied. Unauthorized user." });

  const result = await deleteQuest(questId);

  res.json(result);
};

const updateQuestController = async (req, res) => {
  const playerId = Number(req.params.id);
  const questId = Number(req.params.questId);

  const quest = await findQuestById(questId);

  if (!quest) return res.status(404).json({ error: "Quest not found." });

  if (req.user.id != playerId || req.user.id != quest.playerId)
    return res.status(401).json({ error: "Access denied. Unauthorized user." });

  const { title, description, dueDate, difficulty } = req.body;
  const { gold, exp } = calculateRewards(quest.questType, difficulty);

  const result = await updateQuest(questId, {
    title,
    description,
    dueDate,
    difficulty,
    gold,
    exp,
  });

  res.json(result);
};

module.exports = {
  getActiveQuestsController,
  createQuestController,
  deleteQuestController,
  updateQuestController,
};
