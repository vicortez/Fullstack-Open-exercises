const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  // fetch the user
  const user = await User.findOne({ username })
  if (!user) {
    res.status(400).json({ error: 'Invalid username or password' })
    return
  }
  //   compare password with his hash
  const passwordMatches = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatches) {
    res.status(400).json({ error: 'Invalid username or password' })
    return
  }

  // generate JWT
  const payload = {
    username: user.username,
    sub: user._id.toString(),
  }
  const expirySeconds = 60 * 60 * 12
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: expirySeconds,
  })

  // don't send token directly in the body if there is no need to
  res.json({ token, name: user.name, username: user.username })
})

module.exports = loginRouter
