const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/configs')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

mongoose.set('strictQuery', true)
const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message))

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app
