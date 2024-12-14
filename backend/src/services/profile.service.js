const prisma = require("../lib/prisma");
require("express-async-errors");

const getPlayerProfile =  async (playerId) => {
  const player = await prisma.player.findUnique({
    where: {
      id: Number(playerId)
    }
  })
  if (!player) throw new Error("An unexpected error occured while fetching player information");
  return player;
}

module.exports = {
  getPlayerProfile,
}