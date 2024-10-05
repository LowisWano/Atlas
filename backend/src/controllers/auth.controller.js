const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')
require('express-async-errors');

const signup = async (req, res) => {
  const { name, email, password } = req.body

  if (!password){
    res.status(400).json({error: 'password is required'})
  }

  if(password.length < 3){
    res.status(400).json({error: 'password is too short'})
  }

  let user = await prisma.user.findFirst({where: {email}})

  if(user){
    throw Error('User already exists.')
  }

  const passwordHash = await bcrypt.hash(password, 10)
  
  user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash
    }
  })

  res.json(user)
}

const login =  async (req, res) => {
  const { email, password } = req.body

  let user = await prisma.user.findFirst({where: {email}})
  const passwordIsCorrect =  await bcrypt.compare(password, user.password_hash)

  if(!(user && passwordIsCorrect)){
    res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, process.env.JWT_SECRET)

  res
    .status(200)
    .send({ token, user })
}

module.exports = {
  signup,
  login
}