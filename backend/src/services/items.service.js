// items.service.js
const prisma = require("../lib/prisma");

const getItems = async () => {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("An unexpected error occurred while fetching items.");
  }
};



module.exports = {
  getItems,
  
};