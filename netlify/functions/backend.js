const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to SVM Rockers');
});

// Wrap the app with serverless-http
module.exports.handler = serverless(app);
