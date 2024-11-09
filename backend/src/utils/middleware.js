const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')
const { getUser } = require("../services/auth.service")

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
  const user = await getUser(decodedToken.username)
  if(!user){
    response.json({ error: "User not found" })
  }
  request.user = decodedToken
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'ZodError') {
    return response.status(400).json({ error: error.errors[0].message })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
  userExtractor,
  requestLogger
}