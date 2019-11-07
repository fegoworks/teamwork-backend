const express = require('express');
const bodyparser = require('body-parser');
const {
  Pool,
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// DB connect string
const connect = process.env.DB_URL;

const pool = new Pool({
  connectionString: connect,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

app.use(bodyparser.json());

// app.use('/api/v1/employees', employeeRoutes);

module.exports = app;
