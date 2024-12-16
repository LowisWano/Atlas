const multer = require('multer');
const path = require('path');
const prisma = require('../lib/prisma');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../client/src/assets/profile/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadProfilePic = async (req, res) => {
  const playerId = Number(req.params.id);
//   if (playerId !== req.user.id) {
//     return res.status(401).json({ error: 'Access denied. Unauthorized user.' });
//   }

  const profilePicPath = `src/assets/profile/${req.file.filename}`;

  const updatedPlayer = await prisma.player.update({
    where: { id: playerId },
    data: { profilePic: profilePicPath },
  });

  res.json(updatedPlayer);
};

module.exports = {
  upload,
  uploadProfilePic,
};