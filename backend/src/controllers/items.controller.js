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
  getPlayerItems,
  purchaseItem
};