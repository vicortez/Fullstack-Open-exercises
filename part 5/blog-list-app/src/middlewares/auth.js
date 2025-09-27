const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('../utils/configs')

const tokenExtractor = (req, res, next) => {
  const authorizationHeader = req.get('authorization')
  // if (!authorizationHeader) {
  //   res.status(401).json({ error: 'missing credentials' })
  //   return
  // }
  if (authorizationHeader) {
    const token = authorizationHeader.replace('Bearer ', '')
    req.token = token
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const { token } = req
  if (!token) {
    res.status(401).json({ error: 'missing credentials' })
    return
  }

  const decodedToken = jwt.verify(token, SECRET)
  const { sub } = decodedToken
  if (!sub) {
    res.status(401).json({ error: 'missing identifier in credentials' })
    return
  }

  // note: its not actually great to execute a db query to fetch user on every request
  const user = await User.findById(sub)
  if (!user) {
    res.status(401).json({ error: 'authenticated user not found or invalid' })
    return
  }
  req.user = user
  next()
}

module.exports = { tokenExtractor, userExtractor }
