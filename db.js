require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const getProduct = (request, response) => {

  pool.query(`SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price, array_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features
  FROM product
  JOIN features ON product.id = features.product_id
  WHERE product.id = ${request.params.product_id}
  GROUP BY product.id, product.name, product.slogan, product.description, product.category, product.default_price`, (err, res) => {
  if (err) {
    throw err
  }

  response.status(200).json(res.rows)
})
};

const getProducts = (request, response) => {
  pool.query(`SELECT * FROM product LIMIT 30;`, (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows)
})
};

const getRelated = (request, response) => {
  pool.query(`SELECT array_agg(DISTINCT related_product_id) AS results
  FROM related
  WHERE current_product_id = ${request.params.product_id}
  GROUP BY current_product_id`, (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows[0])
})
};

const getStyles = (request, response) => {
  pool.query(`SELECT product.id,
  json_agg(json_build_object('id', styles.id, 'name', styles.name, 'sale_price', styles.sale_price, 'original_price', styles.original_price, 'default_style', styles.default_style, 'photos', (SELECT json_agg(json_build_object('url', photos.url, 'thumbnail_url', photos.thumbnail_url)) FROM photos WHERE photos."styleId" = styles.id), 'skus', (SELECT json_agg(json_build_object('size', skus.size, 'quantity', skus.quantity)) FROM skus WHERE skus."styleId" = styles.id))) AS styles
FROM product
JOIN styles ON product.id = styles."productId"
WHERE product.id = ${request.params.product_id}
GROUP BY product.id`, (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows[0])
})
};



module.exports = {getProduct, getProducts, getRelated, getStyles};