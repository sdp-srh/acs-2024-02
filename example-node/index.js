const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('<h1>Hello ACS Course</h1><p>My first Express app</p>')
})

app.get('/about', (req, res) => {
  const now = new Date()
  const str = `<h1>About</h1><p>This is a simple Express app</p><p>${now.toISOString()}</p>`
  res.send(str)
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})