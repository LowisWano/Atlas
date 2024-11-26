// purchases.js
const purchasesRouter = require("express").Router({ mergeParams: true });
const {
  postPlayerPurchaseController,
} = require("../controllers/purchase.controller");
const { tokenValidator } = require("../utils/middleware");

purchasesRouter.post("/", tokenValidator, postPlayerPurchaseController);

module.exports = purchasesRouter;