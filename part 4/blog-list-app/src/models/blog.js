const { Schema, model, isObjectIdOrHexString } = require('mongoose')

const blogSchema = new Schema({
  title: { type: String, required: true, minLength: 1 },
  author: String,
  url: { type: String, required: true, minLength: 1 },
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    if (returnedObj.user && isObjectIdOrHexString(returnedObj.user)) {
      returnedObj.user = returnedObj.user.toString()
    }
    delete returnedObj._id
    delete returnedObj.__v
  },
})

const Blog = model('Blog', blogSchema)

module.exports = Blog
