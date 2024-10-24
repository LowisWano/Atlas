const express = require('express')
const app = express()
const cors = require('cors')
const rootRouter = require('./routes')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api', rootRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app