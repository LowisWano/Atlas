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
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error("Error fetching item:", error);
    throw new Error("An unexpected error occurred while fetching the item.");
  }
};

const getItemsByRarity = async (rarity) => {
  try {
    return await prisma.item.findMany({ where: { rarity } });
  } catch (error) {
    console.error("Error fetching items by rarity:", error);
    throw new Error("An unexpected error occurred while fetching items by rarity.");
  }
};

const getItemsByCategory = async (category) => {
  try {
    return await prisma.item.findMany({ where: { category } });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    throw new Error("An unexpected error occurred while fetching items by category.");
  }
};

const searchItems = async (searchTerm) => {
  try {
    return await prisma.item.findMany({
      where: {
        itemName: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    console.error("Error searching items:", error);
    throw new Error("An unexpected error occurred while searching for items.");
  }
};

const getItemsByRarityAndCategory = async (rarity, category) => {
  try {
    return await prisma.item.findMany({
      where: {
        rarity,
        category,
      },
    });
  } catch (error) {
    console.error("Error fetching items by rarity and category:", error);
    throw new Error("An unexpected error occurred while fetching items by rarity and category.");
  }
};

const purchaseItem = async (itemId, playerId) => {
  try {
    // Fetch the player and item details
    const player = await prisma.player.findUnique({ where: { id: parseInt(playerId) } });
    const item = await prisma.item.findUnique({ where: { id: parseInt(itemId) } });

    if (!player || !item) {
      throw new Error("Player or item not found.");
    }

    // Check if the player has enough gold
    if (player.gold < item.price) {
      throw new Error("Not enough gold to purchase the item.");
    }

    // Deduct the item's price from the player's gold
    await prisma.player.update({
      where: { id: parseInt(playerId) },
      data: { gold: player.gold - item.price },
    });

    // Create a record in the playerPurchases table
    const purchase = await prisma.playerPurchases.create({
      data: {
        itemId: parseInt(itemId),
        playerId: parseInt(playerId),
      },
    });

    return purchase;
  } catch (error) {
    console.error("Error purchasing item:", error);
    throw new Error("An unexpected error occurred while purchasing the item.");
  }
};

module.exports = {
  getItems,
  getItem,
  getItemsByRarity,
  getItemsByCategory,
  searchItems,
  getItemsByRarityAndCategory,
  purchaseItem,
};