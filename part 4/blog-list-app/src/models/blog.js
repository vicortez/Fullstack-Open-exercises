const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 1 },
  author: String,
  url: { type: String, required: true, minLength: 1 },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
