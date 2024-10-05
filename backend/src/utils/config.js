require('dotenv').config()

const PORT = process.env.PORT

const DB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.POSTGRES_DB_URL
  : process.env.POSTGRES_DB_URL

module.exports = {
  DB_URL,
  PORT
}