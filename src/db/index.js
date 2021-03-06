const {
  Pool,
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let DB = '';

if (process.env.NODE_ENV === 'TEST') {
  DB = process.env.TEST_URL;
} else {
  DB = process.env.DB_URL;
}
const pool = new Pool({
  connectionString: DB,
});

pool.on('connect', () => {
  console.log('connected to the database');
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
