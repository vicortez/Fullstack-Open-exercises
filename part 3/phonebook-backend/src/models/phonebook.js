const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
if (!url) {
  throw new Error('MONGODB_URL missing')
}
mongoose
  .connect(url)
  .then((res) => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log('Error connecting to mongoDB'))

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (val) {
        return /^\d{2,3}-\d{1,6}$/.test(val)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

phonebookSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

module.exports = Phonebook
