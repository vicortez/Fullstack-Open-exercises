const morgan = require('morgan')

// alternative: slightly customize the default log to add a bit more info
// const getImprovedLogger = () => {
//   morgan.token('req-body', (req, res) => {
//     if (req.body) {
//       return JSON.stringify(req.body)
//     }
//     return '-'
//   })
//   const morganFormatter = ':method :url :status :res[content-length] - :response-time ms :req-body'
// }

module.exports = morgan('tiny')
