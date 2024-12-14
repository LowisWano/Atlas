const userService = require("../services/user.service");

const getUserController = async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);
  res.json(user);
};

module.exports = {
  getUserController,
};