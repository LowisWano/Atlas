const helloRouter = require('express').Router()
const hello = require('../controllers/hello.controller').hello

helloRouter.get('/', hello)

module.exports = helloRouter