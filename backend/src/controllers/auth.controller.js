const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')
const z = require("zod").z
require('express-async-errors');

const signup = async (req, res) => {
  const { name, email, password } = req.body
  // probably better to use zod for validating
  if(!name){
    res.status(400).json({error: 'Name is required'})
  }

  if(!email){
    res.status(400).json({error: 'Email is required'})
  }

  if (!password){
    res.status(400).json({error: 'Password is required'})
  }

  if(password.length < 3){
    res.status(400).json({error: 'Password is too short'})
  }

  // const emailSchema = z.string().email({ message: "Invalid email address" });

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

  return res.json(user)
}

const login =  async (req, res) => {
  const { email, password } = req.body

  let user = await prisma.user.findFirst({where: {email}})
  if(!user){
    return res.status(401).json({
      error: 'User not found!'
    })
  }

  const passwordIsCorrect =  await bcrypt.compare(password, user.password_hash)
  if(!passwordIsCorrect){
    return res.status(401).json({
      error: 'Invalid password.'
    })
  }

  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, process.env.JWT_SECRET)

  return res
    .status(200)
    .send({ token, user })
}

module.exports = {
  signup,
  login
}