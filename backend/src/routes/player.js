const playerRouter = require('express').Router();
const questsRouter = require('./quests');
const profileRouter = require('./profile');
const purchasesRouter = require('./purchases');
const { upload, uploadProfilePic } = require('../controllers/upload.controller');

playerRouter.use('/:id/quests', questsRouter);
playerRouter.use('/:id/profile', profileRouter);
playerRouter.use('/:id/purchase', purchasesRouter);
playerRouter.post('/:id/profile/upload', upload.single('profilePic'), uploadProfilePic);

module.exports = playerRouter;