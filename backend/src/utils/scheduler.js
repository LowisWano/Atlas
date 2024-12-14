const cron = require("node-cron");
const prisma = require("../lib/prisma");

const scheduleQuestRegeneration = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const activeRecurringQuests = await prisma.recurringQuest.findMany({
        where: { isActive: true },
        include: { quest: true }
      });

      for (const recurring of activeRecurringQuests) {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        await prisma.quest.create({
          data: {
            playerId: recurring.quest.playerId,
            title: recurring.quest.title,
            description: recurring.quest.description,
            questType: 'DAILY_QUEST',
            difficulty: recurring.quest.difficulty,
            dueDate: today,
            rewardGold: recurring.quest.rewardGold,
            rewardExp: recurring.quest.rewardExp
          }
        });
      }
    } catch (error) {
      console.error('Quest regeneration failed:', error);
    }
  });
};

module.exports = { scheduleQuestRegeneration };