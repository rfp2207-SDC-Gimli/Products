require("dotenv").config();
const db = require('./db.js')


const express = require('express')
const app = express()
const port = process.env.PORT || 3001
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.get('/products', db.getProducts)
app.get('/products/:product_id', db.getProduct)
app.get('/products/:product_id/related', db.getRelated)
app.get('/products/:product_id/styles', db.getStyles)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})