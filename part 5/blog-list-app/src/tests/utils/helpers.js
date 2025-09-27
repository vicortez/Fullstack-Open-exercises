const jwt = require('jsonwebtoken')
const { SECRET } = require('../../utils/configs')

const getuserToken = (userId) => {
  return jwt.sign({ sub: userId }, SECRET)
}

module.exports = { getuserToken }
