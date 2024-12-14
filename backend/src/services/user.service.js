const prisma = require("../lib/prisma");
require("express-async-errors");

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    },
    select: {
      id: true,
      name: true,
      username: true,
      // Exclude passwordHash for security
    }
  });
  
  if (!user) throw new Error("User not found");
  return user;
};

module.exports = {
  getUserById,
};