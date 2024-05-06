const express = require('express')
const app = express()
const port = process.env.PORT || 3001
app.use(express.json())


app.get('/', function (req, res) {
  res.send('<h1>Greetings</h1><p>We are running in a docker container</p>')
})

app.get('/about', (req, res) => {
  const now = new Date()
  const str = `<h1>About</h1><p>This is a simple Express app</p><p>${now.toISOString()}</p>`
  res.send(str)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})