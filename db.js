require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const getProduct = (request, response) => { //refactor because it only uses product 5
  pool.query(`SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price, array_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features
  FROM product
  JOIN features ON product.id = features.product_id
  WHERE product.id = 5
  GROUP BY product.id, product.name, product.slogan, product.description, product.category, product.default_price`, (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows)
})
};

const getProducts = (request, response) => {
  pool.query(`SELECT * FROM product LIMIT 5;`, (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows)
})
};

const getRelated = (request, response) => {
  pool.query(`SELECT array_agg(DISTINCT related_product_id) AS results
  FROM related
  WHERE current_product_id = 5
  GROUP BY current_product_id`, (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows[0])
})
};


module.exports = {getProduct, getProducts, getRelated};