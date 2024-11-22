const itemsRouter = require("express").Router();
const itemsController = require("../controllers/items.controller");
const { tokenValidator } = require("../utils/middleware");

// Define specific routes first
itemsRouter.get("/search", tokenValidator, itemsController.searchItems);
itemsRouter.get("/rarity/:rarity/category/:category", tokenValidator, itemsController.getItemsByRarityAndCategory);
itemsRouter.get("/rarity/:rarity", tokenValidator, itemsController.getItemsByRarity);
itemsRouter.get("/category/:category", tokenValidator, itemsController.getItemsByCategory);

// Define generic routes last
itemsRouter.get("/", tokenValidator, itemsController.getItems);
itemsRouter.get("/:id", tokenValidator, itemsController.getItem);
itemsRouter.post("/purchase", tokenValidator, itemsController.purchaseItem);

module.exports = itemsRouter;