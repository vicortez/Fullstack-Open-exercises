require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./src/models/phonebook')
const errorHandler = require('./src/middlewares/errorHandler')

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

// -- endpoints
app.get('/health', (req, res) => {
  res.send('hi')
})

app.get('/api/persons', (req, res, next) => {
  Phonebook.find({})
    .then((phonebooks) => {
      res.json(phonebooks)
    })
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((phonebook) => {
      if (!phonebook) {
        const error = new Error('Not found')
        error.status = 404
        throw error
      }

      res.json(phonebook)
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Phonebook.findByIdAndDelete(id)
    .then((doc) => {
      res.status(204).end()
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  // validate
  if (!body.name || !body.number) {
    const error = new Error('Missing fields')
    error.status = 400
    next(error)
    return
  }

  Phonebook.exists({ name: req.body.name })
    .then((foundPhonebook) => {
      if (foundPhonebook) {
        const error = new Error('Name already exists')
        error.status = 400
        throw error
      }
      return
    })
    .then(() => {
      const newPhonebook = new Phonebook({
        name: body.name,
        number: body.number,
      })
      // save
      return newPhonebook.save()
    })
    .then((doc) => res.json(doc))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((phonebook) => {
      if (!phonebook) {
        const error = new Error('Phonebook not found')
        error.status = 404
        throw error
      }
      phonebook.name = req.body.name
      phonebook.number = req.body.number
      return phonebook.save()
    })
    .then((savedPhonebook) => {
      res.json(savedPhonebook)
    })
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Phonebook.countDocuments({})
    .then((result) => {
      const page = `
<p>Phonebook has info for ${result} people</p>
<p>${new Date().toString()}</p>
  `
      res.send(page)
    })
    .catch(next)
})
// --

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
console.log('Server starting..')
