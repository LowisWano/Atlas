const crazyRouter = require('express').Router()

crazyRouter.get('/', async (req, res) => {
  res.json("crazy!");
})

module.exports = crazyRouter