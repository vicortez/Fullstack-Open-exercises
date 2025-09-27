const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const saltRounds = 10

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!password || password.length < 3) {
    res
      .status(400)
      .json({ error: 'password should be at least 3 characters long' })
    return
  }

  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ username, passwordHash })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  res.json(users)
})

module.exports = usersRouter
