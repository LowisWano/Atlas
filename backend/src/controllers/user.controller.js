const userService = require("../services/user.service");

const getUserController = async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);
  res.json(user);
};

const updateUserController = async (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const updatedUser = await userService.updateUserName(userId, name);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = {
  getUserController,
  updateUserController,
};