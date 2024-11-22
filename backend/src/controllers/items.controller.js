const itemsService = require("../services/items.service");

const getItems = async (req, res) => {
  const items = await itemsService.getItems();
  res.json(items);
};

const getItem = async (req, res) => {
  const { id } = req.params;
  const item = await itemsService.getItem(id);
  res.json(item);
};

const getItemsByRarity = async (req, res) => {
  const { rarity } = req.params;
  const items = await itemsService.getItemsByRarity(rarity);
  res.json(items);
};

const getItemsByCategory = async (req, res) => {
  const { category } = req.params;
  const items = await itemsService.getItemsByCategory(category);
  res.json(items);
};

const searchItems = async (req, res) => {
  const { searchTerm } = req.body;
  const items = await itemsService.searchItems(searchTerm);
  res.json(items);
};

const getItemsByRarityAndCategory = async (req, res) => {
  const { rarity, category } = req.params;
  const items = await itemsService.getItemsByRarityAndCategory(rarity, category);
  res.json(items);
};

const purchaseItem = async (req, res) => {
  const { itemId, playerId } = req.body;
  const purchase = await itemsService.purchaseItem(itemId, playerId);
  res.json(purchase);
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