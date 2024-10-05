const authRouter = require('express').Router()
const signup = require('../controllers/auth.controller').signup

authRouter.post('/signup', signup)
authRouter.get('/signup', async (req,res) => {
  res.json("sign up!")
})

module.exports = authRouter