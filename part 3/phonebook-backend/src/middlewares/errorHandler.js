const errorHandler = (error, req, res, next) => {
  console.log('ERRORR:::::')
  if (typeof error != 'object') {
    console.error('Error handler was called, but error is not an object')
    next(error)
    return
  }
  console.error(error.message)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'Casting error. Malformed id?' })
    return
  }

  res.status(error.status ?? 500).send({ error: error.message })
}

module.exports = errorHandler
