require("dotenv").config();
const db = require('./db.js')


const express = require('express')
const app = express()
const port = 3001
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.get('/products', db.getProducts)
app.get('/products/productid', db.getProduct)
app.get('/products/productid/related', db.getRelated)
app.get('/products/productid/styles', db.getStyles)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})