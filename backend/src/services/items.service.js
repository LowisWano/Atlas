// items.service.js
const prisma = require("../lib/prisma");

const getItems = async () => {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("An unexpected error occurred while fetching items.");
  }
};

const getPlayerItems = async (playerId) => {
  try {
    return await prisma.playerPurchases.findMany({
      where: { playerId: parseInt(playerId) },
      include: {
        item: true
      }
    });
  } catch (error) {
    console.error("Error fetching player items:", error);
    throw new Error("An unexpected error occurred while fetching player items.");
  }
};



module.exports = {
  getItems,
  getPlayerItems,

};