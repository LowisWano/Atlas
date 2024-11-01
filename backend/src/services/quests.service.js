const prisma = require('../lib/prisma')

const fetchPlayerQuests = async (id) => {
  const quests = await prisma.player.findUnique({
    include:{
      quests: true
    },
    where: {
      id: id,
    },
  })
  return quests
}

const savePlayerQuest = async (
  { 
    playerId,
    title, 
    description, 
    questType, 
    dueDate, 
    difficulty,
    gold,
    exp
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
          id: playerId
        }
      }
    },
    include: {
      player: true
    }
  });
  return quest
}

module.exports = {
  fetchPlayerQuests,
  savePlayerQuest
}