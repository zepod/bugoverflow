const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const initDB = require('./database');
const config = require('./config');
require('./app/models');
const routes = require('./app/routes');
const port = config.port || 8080;

app.disable('x-powered-by');

mongoose.Promise = global.Promise

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.use('/api/', routes);

const db = initDB(() => {
  const wat = mongoose.model('Article').loadCollection();
  wat.then((w) => {console.log(w)})
});

if (__PROD__) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'))
  });
}

if (__DEV__) {
}

app.listen(port, () => {
  console.log('===> Server is listening on port', port);
})
