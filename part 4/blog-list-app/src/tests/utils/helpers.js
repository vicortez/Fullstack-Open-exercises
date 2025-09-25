const jwt = require('jsonwebtoken')

const getuserToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.SECRET)
}

module.exports = { getuserToken }
