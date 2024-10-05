const express = require('express')
const app = express()
const cors = require('cors')
const rootRouter = require('./routes')

app.use(cors())
app.use(express.json())

app.use('/api', rootRouter)

module.exports = app