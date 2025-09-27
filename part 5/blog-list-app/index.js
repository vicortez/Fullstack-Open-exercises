const app = require('./src/app')
const { PORT } = require('./src/utils/configs')

const port = PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
