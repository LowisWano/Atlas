const authRouter = require('express').Router()
const auth = require('../controllers/auth.controller')

authRouter.post('/signup', auth.signup)
authRouter.post('/login', auth.login)

module.exports = authRouter