const { Schema, model, isObjectIdOrHexString } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    if (returnedObj._id) {
      returnedObj.id = returnedObj._id.toString()
    }
    if (Array.isArray(returnedObj.blogs) && returnedObj.blogs.length > 0) {
      returnedObj.blogs = returnedObj.blogs.map((el) => {
        if (isObjectIdOrHexString(el)) {
          return el.toString()
        } else {
          return el
        }
      })
    }
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  },
})

const User = model('User', userSchema)

module.exports = User
