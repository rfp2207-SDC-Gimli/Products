require("dotenv").config();
const db = require('./db.js')


const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.get('/products', db.testDB)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})