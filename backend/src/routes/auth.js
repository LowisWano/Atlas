const authRouter = require("express").Router();
const auth = require("../controllers/auth.controller");
const { parseCreateUserInputs } = require("../utils/validators");

authRouter.post("/signup", parseCreateUserInputs, auth.signup);
authRouter.post("/login", auth.login);

module.exports = authRouter;
