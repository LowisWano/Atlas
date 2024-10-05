const express = require('express')
const authRouter = require('./auth')
const helloRouter = require('./hello')

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/hello', helloRouter)

module.exports = rootRouter