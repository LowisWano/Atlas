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

const getPlayerPurchase = async(playerId) => {
  const purchases = await prisma.playerPurchases.findMany({
    where: {
      playerId: Number(playerId) // Changed from id to playerId
    },
    include: {
      item: true // Include item details
    }
  });
  if (!purchases) throw new Error("An unexpected error occurred while fetching player purchases");
  return purchases;
}

const updatePlayerInfo = async (
  playerId, 
  {
    profilePic,
    bio,
    streak
  },
) => {
  const result = await prisma.player.update({
    where: {
      id: playerId,
    },
    data: {
      profilePic,
      bio,
      streak
    }
  })
  return result;
}

module.exports = {
  getPlayerProfile,
  getPlayerPurchase,
  updatePlayerInfo,
}