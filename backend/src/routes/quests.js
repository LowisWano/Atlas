const questsRouter = require('express').Router()
const quests = require('../controllers/quests.controller')
const { userExtractor } = require('../utils/middleware')

questsRouter.get('/', quests.getAllQuests)
questsRouter.post('/', userExtractor, quests.createQuest)

module.exports = questsRouter