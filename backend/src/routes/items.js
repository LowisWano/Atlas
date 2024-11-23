// items.js (routes)
const itemsRouter = require("express").Router();
const itemsController = require("../controllers/items.controller");
const { tokenValidator } = require("../utils/middleware");

// Search and filter routes
itemsRouter.post("/search", tokenValidator, itemsController.searchItems);
itemsRouter.get("/rarity/:rarity", tokenValidator, itemsController.getItemsByRarity);
itemsRouter.get("/player/:playerId", tokenValidator, itemsController.getPlayerItems);

// Basic CRUD routes
itemsRouter.get("/", tokenValidator, itemsController.getItems);
itemsRouter.get("/:id", tokenValidator, itemsController.getItem);
itemsRouter.post("/purchase", tokenValidator, itemsController.purchaseItem);

module.exports = itemsRouter;