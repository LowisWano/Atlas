const {
  getNormalQuests,
  getDailyQuests,
  createPlayerQuest,
  createRecurringQuest,
  deleteQuest,
  findQuestById,
  updateQuest,
  updateQuestStatus,
} = require("../services/quests.service");
require("express-async-errors");
const { calculateRewards } = require("../utils/utils");

const getActiveQuestsController = async (req, res, next) => {
  try {
    const playerId = req.user.id;
    const normalQuests = await getNormalQuests(playerId);
    const dailyQuests = await getDailyQuests(playerId);
    const activeQuests = normalQuests.concat(dailyQuests);
    res.json(activeQuests);
  } catch (error) {
    next(error);
  }
};

const createQuestController = async (req, res, next) => {
  try {
    const playerId = Number(req.params.id);
    if (playerId != req.user.id)
      return res
        .status(401)
        .json({ error: "Access denied. Unauthorized user." });

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
  } catch (error) {
    next(error);
  }
};

const deleteQuestController = async (req, res, next) => {
  try {
    const playerId = Number(req.params.id);
    const questId = Number(req.params.questId);

    const quest = await findQuestById(questId);

    if (!quest) return res.status(404).json({ error: "Quest not found." });

    if (req.user.id != playerId || req.user.id != quest.playerId)
      return res
        .status(401)
        .json({ error: "Access denied. Unauthorized user." });

    const result = await deleteQuest(questId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateQuestController = async (req, res, next) => {
  try {
    const playerId = Number(req.params.id);
    const questId = Number(req.params.questId);

    const quest = await findQuestById(questId);

    if (!quest) return res.status(404).json({ error: "Quest not found." });

    if (req.user.id != playerId || req.user.id != quest.playerId)
      return res
        .status(401)
        .json({ error: "Access denied. Unauthorized user." });

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
  } catch (error) {
    next(error);
  }
};

const updateStatusQuestController = async (req, res, next) => {
  try {
    const playerId = Number(req.params.id);
    const questId = Number(req.params.questId);

    const quest = await findQuestById(questId);

    if (!quest) return res.status(404).json({ error: "Quest not found." });

    if (req.user.id != playerId || req.user.id != quest.playerId)
      return res
        .status(401)
        .json({ error: "Access denied. Unauthorized user." });

    const { status } = req.body;

    const result = await updateQuestStatus(questId, status);

    if (!result) {
      throw new Error("Failed to update quest status");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActiveQuestsController,
  createQuestController,
  deleteQuestController,
  updateQuestController,
  updateStatusQuestController,
};
