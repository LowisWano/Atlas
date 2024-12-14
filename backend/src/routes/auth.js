const authRouter = require("express").Router();
const auth = require("../controllers/auth.controller");
const { parseCreateUserInputs, parseLoginUserInputs } = require("../utils/validators");

authRouter.post("/signup", parseCreateUserInputs, auth.signup);
authRouter.post("/login", parseLoginUserInputs, auth.login);

module.exports = authRouter;
