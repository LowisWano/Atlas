const questsRouter = require('express').Router()
const quests = require('../controllers/quests.controller')

questsRouter.get('/', quests.getAllQuests)

module.exports = questsRouter