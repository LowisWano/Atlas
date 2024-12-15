const {
  getPlayerProfile,
  getPlayerPurchase,
  updatePlayerInfo,
} = require("../services/profile.service")
require("express-async-errors");

const getPlayerProfileController = async (req, res) => {
  const playerId = Number(req.params.id);
  if (playerId != req.user.id)
    return res.status(401).json({ error: "Access denied. Unauthorized user." });

  const player = await getPlayerProfile(playerId);
  if (!player) return res.status(404).json({ error: "Player not found." });

  res.json(player)
}

const getPlayerPurchases = async (req,res) =>{
  const playerId = Number(req.params.id);
  if (playerId != req.user.id)
    return res.status(401).json({ error: "Access denied. Unauthorized user." });

  const player = await getPlayerPurchase(playerId);
  if (!player) return res.status(404).json({ error: "Player not found." });

  res.json(player)
}

const updatePlayerInfoController = async (req, res, next) =>{
  try {
    const playerId = Number(req.params.id);
    if (playerId!= req.user.id)
      return res.status(401).json({ error: "Access denied. Unauthorized user." });

    const { profilePic, bio, streak} = req.body;
    const result = await updatePlayerInfo(playerId, {profilePic, bio, streak});

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPlayerProfileController,
  getPlayerPurchases,
  updatePlayerInfoController,
}
