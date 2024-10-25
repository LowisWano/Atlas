const express = require('express')
const authRouter = require('./auth')
const helloRouter = require('./hello')
const questsRouter = require('./quests')

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/hello', helloRouter)
rootRouter.use('/player', questsRouter)

module.exports = rootRouter