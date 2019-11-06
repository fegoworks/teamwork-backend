const express = require('express');

const app = express();
app.use((req, res) => {
  res.json({
    messsage: 'Your request was successful',
  });
});

module.exports = app;
