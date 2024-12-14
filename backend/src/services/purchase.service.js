// purchase.service.js
const prisma = require("../lib/prisma");

const postPurchase = async (playerId, itemId) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Get player with their purchases
      const player = await prisma.player.findUnique({
        where: { id: parseInt(playerId) },
        include: {
          items: {
            where: { itemId: parseInt(itemId) }
          }
        }
      });

      // Get item details
      const item = await prisma.item.findUnique({
        where: { id: parseInt(itemId) }
      });

      // Validate existence
      if (!player || !item) {
        throw new Error("Player or item not found");
      }

      // Check if already owned
      if (player.items.length > 0) {
        throw new Error("Player already owns this item");
      }

      // Check if enough gold
      if (player.gold < item.price) {
        throw new Error("Insufficient gold");
      }

      // Update player gold and create purchase
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
    console.error("Purchase service error:", error);
    throw new Error(error.message || "Failed to process purchase");
  }
};

module.exports = {
  postPurchase
};