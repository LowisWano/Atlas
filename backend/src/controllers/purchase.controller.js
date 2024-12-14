// purchase.controller.js
const { postPurchase } = require("../services/purchase.service");
require("express-async-errors");

const postPlayerPurchaseController = async (req, res) => {
  const playerId = Number(req.params.id);
  const { itemId } = req.body;

  if (playerId !== req.user.id) {
    return res.status(401).json({ error: "Access denied. Unauthorized user." });
  }

  try {
    const purchase = await postPurchase(playerId, itemId);
    res.status(201).json(purchase);
  } catch (error) {
    if (
      error.message === "Insufficient gold" ||
      error.message === "Player already owns this item" ||
      error.message === "Player or item not found"
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postPlayerPurchaseController,
};