const express = require('express');
const bodyparser = require('body-parser');
const {
  Pool,
} = require('pg');
const dotenv = require('dotenv');

const userRoute = require('./routes/user.route');
const articleRoute = require('./routes/article.route');
const gifRoute = require('./routes/gifs.route');
const articleCommentRoute = require('./routes/article.comment.route');

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
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/api/v1/', userRoute);
app.use('/api/v1/', articleRoute);
app.use('/api/v1/', gifRoute);
app.use('/api/v1/', articleCommentRoute);

module.exports = app;
