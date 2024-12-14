// items.js (routes)
const itemsRouter = require("express").Router();
const itemsController = require("../controllers/items.controller"); 
const { tokenValidator } = require("../utils/middleware");

itemsRouter.get("/", tokenValidator, itemsController.getItems);
itemsRouter.get("/player/:playerId", tokenValidator, itemsController.getPlayerItems);
itemsRouter.post("/purchase", tokenValidator, itemsController.purchaseItem);

module.exports = itemsRouter;