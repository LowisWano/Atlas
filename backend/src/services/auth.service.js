const prisma = require("../lib/prisma");
require("express-async-errors");

const getUser = async (username) => {
  if (!username) {
    throw new Error("Invalid Token Credentials");
  }
  const user = await prisma.user.findUniqueOrThrow({ where: { username } });
  return user;
}

const createUser = async ({
  name,
  username,
  passwordHash
}) => {
 const user = await prisma.user.create({
  data: {
    name,
    username,
    passwordHash,
    player: {
      create: {}
    },
  },
  include: {
    player: true,
  },
 })

  return user;
}

module.exports = {
  createUser,
  getUser
}