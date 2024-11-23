// items.controller.js
const itemsService = require("../services/items.service");

const getItems = async (req, res) => {
  try {
    const items = await itemsService.getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemsService.getItem(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemsByRarity = async (req, res) => {
  try {
    const { rarity } = req.params;
    const items = await itemsService.getItemsByRarity(rarity);
    res.json(items);
  } catch (error) {
    if (error.message === "Invalid rarity type") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const searchItems = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const items = await itemsService.searchItems(searchTerm);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlayerItems = async (req, res) => {
  try {
    const { playerId } = req.params;
    const items = await itemsService.getPlayerItems(playerId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const purchaseItem = async (req, res) => {
  try {
    const { itemId, playerId } = req.body;
    const purchase = await itemsService.purchaseItem(itemId, playerId);
    res.json(purchase);
  } catch (error) {
    if (error.message === "Insufficient gold" || 
        error.message === "Player already owns this item" ||
        error.message === "Player or item not found") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
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