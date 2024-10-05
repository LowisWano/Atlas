const express = require('express')
const app = express()
const cors = require('cors')

const helloRouter = require('./src/controllers/hello.controller')
const crazyRouter = require('./src/controllers/crazy.controller')

app.use(cors())
app.use(express.json())

app.use('/', helloRouter)
app.use('/api/crazy', crazyRouter)

module.exports = app