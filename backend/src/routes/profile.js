const profileRouter = require("express").Router({ mergeParams: true });
const {
  getPlayerProfileController,
} = require("../controllers/profile.controller")
const { tokenValidator } = require("../utils/middleware");

profileRouter.get("/", tokenValidator, getPlayerProfileController);

module.exports = profileRouter;