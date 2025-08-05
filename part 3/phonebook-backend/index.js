const express = require('express')
let { phonebookData } = require('./data')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hi')
})

app.get('/api/persons', (req, res) => {
  res.json(phonebookData)
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
  console.log(req.body)

  const body = req.body
  // validate
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Missing fields', message: 'Missing fields' })
    return
  }
  const nameAlreadyExists = phonebookData.some((el) => el.name === body.name)
  if (nameAlreadyExists) {
    res
      .status(400)
      .json({ error: 'Name already exists', message: 'Name already exists' })
    return
  }
  // create id ]0-100k
  const id = Math.trunc(Math.random() * 100000) + 1

  const newPerson = { id, name: body.name, number: body.number }
  // save
  phonebookData.push(newPerson)
  res.json(newPerson)
})

app.get('/info', (req, res) => {
  const page = `
  <p>Phonebook has info for ${phonebookData.length} people</p>
  <p>${new Date().toString()}</p>
  `
  res.send(page)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server started on port ${PORT}`)
