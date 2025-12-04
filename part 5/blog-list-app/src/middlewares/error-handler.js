const errorHandler = (error, req, res, next) => {
  if (typeof error !== 'object') {
    console.error(
      'Error handler middleware was triggered, but error is not an object!: ',
      error
    )
    res.status(500).json('Unidentified error')
    return
  }

  console.error('Error middleware triggered: ', error)

  switch (error.name) {
    case 'CastError':
      res.status(400).json({ error: 'Casting error. Malformed id?' })
      return
    case 'ValidationError':
      res.status(400).json({ error: error.message })
      return
    case 'MongoServerError':
      if (error.message.includes('E11000 duplicate key error')) {
        const field = error.keyValue ? Object.keys(error.keyValue)[0] : 'field'
        res.status(400).json({ error: `expected \`${field}\` to be unique` })
      }
      return
    case 'TokenExpiredError':
      res.status(401).json({ error: 'Expired authentication' })
      return
    case 'JsonWebTokenError':
    case 'NotBeforeError':
      res.status(401).json({ error: 'Invalid authentication' })
      return
  }
  next(error)
}

module.exports = errorHandler
