const prisma = require("../lib/prisma");
require("express-async-errors");

const getUser = async (username) => {
  const user = await prisma.user.findFirst({ where: { username } });
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