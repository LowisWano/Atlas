const profileRouter = require("express").Router({ mergeParams: true });
const { getPlayerProfileController, getPlayerPurchases } = require("../controllers/profile.controller");
const { tokenValidator } = require("../utils/middleware");

profileRouter.get("/", tokenValidator, getPlayerProfileController);
profileRouter.get("/items", tokenValidator, getPlayerPurchases); // Add this route

module.exports = profileRouter;