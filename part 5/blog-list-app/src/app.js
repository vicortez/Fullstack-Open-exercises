const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/configs')
const errorHandler = require('./middlewares/error-handler')
const { tokenExtractor } = require('./middlewares/auth')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const requestLogger = require('./middlewares/request-logger')

const app = express()

mongoose.set('strictQuery', true)
const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message))

app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app
