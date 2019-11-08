const {
  Pool,
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});


/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
const query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = query;
