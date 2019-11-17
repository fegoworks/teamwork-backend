const express = require('express');
const bodyparser = require('body-parser');

const userRoute = require('./routes/user.route');
const articleRoute = require('./routes/article.route');
const gifRoute = require('./routes/gifs.route');
const articleCommentRoute = require('./routes/article.comment.route');
const gifCommentRoute = require('./routes/gif.comment.route');
const feedRoute = require('./routes/feed.route');

const app = express();

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
app.use('/api/v1/', gifCommentRoute);
app.use('/api/v1/', feedRoute);

app.get('/', (req, res) => {
  res.send('Welcome to Teamwork! Built by Fego for DevC');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'that route does not exist',
  });
});

module.exports = app;
