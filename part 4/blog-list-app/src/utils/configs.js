require('dotenv').config()

const PORT = 3003

// Obs AVOID this pattern in production apps. I'm doing this here to follow along the course
// See: 12 factor app, rule 3.
let MONGODB_URI
switch (process.env.NODE_ENV) {
  case 'test':
    MONGODB_URI = process.env.TEST_MONGODB_URI
    break
  case 'production':
    MONGODB_URI = process.env.MONGODB_URI
    break
  case 'local':
    MONGODB_URI = process.env.MONGODB_URI
    break
  default:
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { PORT, MONGODB_URI }
