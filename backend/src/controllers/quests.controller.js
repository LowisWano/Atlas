const prisma = require('../lib/prisma')
require('express-async-errors');

const getAllQuests = async (req, res) => {
  const quests = await prisma.quest.findMany({
    include:{
      player: true
    }
  });

  res.json(quests);
}

module.exports = {
  getAllQuests
}