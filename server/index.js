const path = require('path');
const express = require('express');

const initApp = require('./app');
const initDB = require('./database');
const routes = require('./app/routes');

const errors = require('./app/errors');

// global dependencies
require('./app/models');

// initialize
const app = initApp();
const db = initDB();

// serve API
app.use('/api/', routes);
app.use('/static', express.static(path.join(__dirname, '../build/static')));
app.use('/api/*', (req, res, next) => {
  errors.throw(next, 404);
});
app.use(errors.handle)

if (__PROD__) {
  // serve the app
  app.get('*', (req, res) => {
    res.status(200);
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

if (__DEV__) {
}

module.exports = {
  app,
  db
}
