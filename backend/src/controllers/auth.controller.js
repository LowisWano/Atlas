const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");
const z = require("zod").z;
require("express-async-errors");
const { Rank } = require("../constants");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  if (password.length < 3) {
    return res.status(400).json({ error: "Password is too short" });
  }

  let user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    return res.status(400).json({ error: "User already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await prisma.$transaction(async (prisma) => {
      user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: passwordHash,
          player: {
            create: {
              level: 1,
              experience: 0,
              gold: 0,
              adventurerRank: "COPPER",
            },
          },
        },
        include: {
          player: true,
        },
      });

      return user;
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return res.status(401).json({
      error: "User not found.",
    });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordIsCorrect) {
    return res.status(401).json({
      error: "Invalid password.",
    });
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).send({ token, user });
};

module.exports = {
  signup,
  login,
};
