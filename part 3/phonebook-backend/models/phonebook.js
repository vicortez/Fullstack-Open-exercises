const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
if (!url) {
  throw new Error('MONGODB_URL missing')
}
const db = mongoose
  .connect(url)
  .then((res) => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log('Error connecting to mongoDB'))

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
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
