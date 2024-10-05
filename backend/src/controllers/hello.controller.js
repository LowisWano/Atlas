const helloRouter = require('express').Router()

helloRouter.get('/', async (req, res) => {
  res.json("Hello World!");
})

module.exports = helloRouter