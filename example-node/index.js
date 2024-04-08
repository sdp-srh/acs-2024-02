const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello ACS Course</h1><p>My first Express app</p>')
})

app.listen(3000)