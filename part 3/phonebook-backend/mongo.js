const mongoose = require('mongoose')

// read and validate arguments - exit early
const args = process.argv.slice(2)
if (args.length != 1 && args.length != 3) {
  console.error(
    'Needs 1 or 3 parameters. password or password + phonebook data. Found ' +
      args.length
  )
  process.exit(1)
}
// connect to database
mongoose.set('strictQuery', false)

const password = args[0]
const url = `mongodb+srv://ctovictor:${password}@cluster0.jcpaylx.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// if only one argument, log database
if (args.length == 1) {
  Phonebook.find({}).then((res) => {
    console.log('phonebook:')
    res.forEach((phonebookRecord) => {
      console.log(` ${phonebookRecord.name} ${phonebookRecord.number}`) // use
    })
    mongoose.connection.close()
  })
} else {
  // if two arguments, save to database and log result.
  const newPhonebook = new Phonebook({
    name: args[1],
    number: args[2],
  })
  newPhonebook.save().then((res) => {
    console.log(`Added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
}
