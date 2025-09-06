const errorHandler = (error, req, res, next) => {
  if (typeof error !== 'object') {
    console.error(
      'Error handler middleware was triggered, but error is not an object!: ',
      error
    )
    res.status(500).send('Unidentified error')
    return
  }

  console.error('Error middleware triggered: ', error)

  switch (error.name) {
    case 'ValidationError':
      res.status(400).send({ error: error.message })
      return
  }
  next(error)
}

module.exports = errorHandler
