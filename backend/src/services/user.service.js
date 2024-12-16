const prisma = require("../lib/prisma");
require("express-async-errors");

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      name: true,
      username: true,
      // Exclude passwordHash for security
    },
  });

  if (!user) throw new Error("User not found");
  return user;
};

const updateUserName = async (userId, name) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) throw new Error("User not found");

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
    },
  });

  return updatedUser;
};

module.exports = {
  getUserById,
  updateUserName,
};
