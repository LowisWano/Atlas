const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");
require("express-async-errors");
const { getUser, createUser } = require("../services/auth.service");

const signup = async (req, res) => {
  const { name, username, password } = req.body;

  let user = await getUser(username);
  if (user) {
    return res.status(400).json({ error: "Username is already taken." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await createUser({
    name,
    username,
    passwordHash,
  });

  return res.json(result);
};

const login = async (req, res) => {
  const { username, password } = req.body;

  let user = await getUser(username);
  if (!user) {
    return res.status(401).json({
      error: "Verify your username or password and try again",
    });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordIsCorrect) {
    return res.status(401).json({
      error: "Verify your username or password and try again",
    });
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET
  );

  return res.status(200).send({ token, user });
};

module.exports = {
  signup,
  login,
};
