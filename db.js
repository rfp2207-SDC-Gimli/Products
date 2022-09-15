require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const testDB = (request, response) => {
  pool.query('SELECT * FROM public.features LIMIT 100', (err, res) => {
  if (err) {
    throw err
  }
  response.status(200).json(res.rows)
})
}



module.exports = {testDB};