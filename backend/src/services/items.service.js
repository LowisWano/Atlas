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

const purchaseItem = async (itemId, playerId) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const player = await prisma.player.findUnique({
        where: { id: parseInt(playerId) },
        include: {
          items: {
            where: { itemId: parseInt(itemId) }
          }
        }
      });

      const item = await prisma.item.findUnique({
        where: { id: parseInt(itemId) }
      });

      if (!player || !item) {
        throw new Error("Player or item not found");
      }

      if (player.items.length > 0) {
        throw new Error("Player already owns this item");
      }

      if (player.gold < item.price) {
        throw new Error("Insufficient gold");
      }

      await prisma.player.update({
        where: { id: parseInt(playerId) },
        data: { gold: player.gold - item.price }
      });

      return await prisma.playerPurchases.create({
        data: {
          playerId: parseInt(playerId), 
          itemId: parseInt(itemId)
        },
        include: {
          item: true,
          player: true
        }
      });
    });
  } catch (error) {
    console.error("Error purchasing item:", error);
    throw new Error(error.message || "An unexpected error occurred while purchasing the item.");
  }
};

module.exports = {
  getItems,
  getPlayerItems,
  purchaseItem
};