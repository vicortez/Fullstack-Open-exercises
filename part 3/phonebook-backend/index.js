require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')

const app = express()

app.use(express.json())
app.use(express.static('client/dist'))

morgan.token('req-body', (req, res) => {
  if (req.body) return JSON.stringify(req.body)
  return '-'
})
const morganFormatter =
  ':method :url :status :res[content-length] - :response-time ms :req-body'
app.use(morgan(morganFormatter))

app.get('/health', (req, res) => {
  res.send('hi')
})

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((phonebooks) => {
    res.json(phonebooks)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(404).json({ error: 'Not found', message: 'id not recognized' })
    return
  }
  const person = phonebookData.find((el) => el.id === id) // 1 person: find, not filter.
  if (!person) {
    res.status(404).json({ error: 'Not found', message: 'Person not found' })
    return
  }
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(404).json({ error: 'Not found', message: 'id not recognized' })
    return
  }
  phonebookData = phonebookData.filter((el) => el.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  // validate
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Missing fields', message: 'Missing fields' })
    return
  }

  const newPerson = new Phonebook({
    name: body.name,
    number: body.number,
  })
  console.log(body)
  // save
  newPerson.save().then((doc) => res.json(doc))
})

app.get('/info', (req, res) => {
  const page = `
  <p>Phonebook has info for ${phonebookData.length} people</p>
  <p>${new Date().toString()}</p>
  `
  res.send(page)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
console.log('Server starting..')
