const profileRouter = require("express").Router({ mergeParams: true });
const { getPlayerProfileController, getPlayerPurchases, updatePlayerInfoController } = require("../controllers/profile.controller");
const { tokenValidator } = require("../utils/middleware");

profileRouter.get("/", tokenValidator, getPlayerProfileController);
profileRouter.get("/items", tokenValidator, getPlayerPurchases); // Add this route
profileRouter.put("/update", tokenValidator, updatePlayerInfoController);

module.exports = profileRouter;