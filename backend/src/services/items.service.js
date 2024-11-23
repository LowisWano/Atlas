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

const getItem = async (id) => {
  try {
    return await prisma.item.findUnique({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    console.error("Error fetching item:", error);
    throw new Error("An unexpected error occurred while fetching the item.");
  }
};

const getItemsByRarity = async (rarity) => {
  try {
    const validRarities = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];
    
    if (!validRarities.includes(rarity)) {
      throw new Error("Invalid rarity type. Must be one of: " + validRarities.join(', '));
    }

    return await prisma.item.findMany({
      where: { rarity }
    });
  } catch (error) {
    console.error("Error fetching items by rarity:", error);
    throw new Error("An unexpected error occurred while fetching items by rarity.");
  }
};

const searchItems = async (searchTerm) => {
  try {
    return await prisma.item.findMany({
      where: {
        OR: [
          {
            itemName: {
              contains: searchTerm,
              mode: "insensitive",
            }
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error("Error searching items:", error);
    throw new Error("An unexpected error occurred while searching for items.");
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
    // Start transaction
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

      // Check if player already owns the item
      if (player.items.length > 0) {
        throw new Error("Player already owns this item");
      }

      // Check if player has enough gold
      if (player.gold < item.price) {
        throw new Error("Insufficient gold");
      }

      // Update player's gold
      await prisma.player.update({
        where: { id: parseInt(playerId) },
        data: { gold: player.gold - item.price }
      });

      // Create purchase record
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
  getItem,
  getItemsByRarity,
  searchItems,
  getPlayerItems,
  purchaseItem
};