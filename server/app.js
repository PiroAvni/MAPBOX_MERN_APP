const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const connectDB = require('./config/db-setup.js')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const logger = require('./middleware/logger')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(morgan)
app.use(logger)



app.get('/', (req, res) => {
  res.json({ App: 'Welcome to the Server!!' })
})

app.use(notFound)
app.use(errorHandler)

module.exports = app