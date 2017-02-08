const initApp = require('./app');
const initDB = require('./database');
const path = require('path');
const composeMiddlewares = require('./app/middlewares')

// initialize
const db = initDB();
const newApp = initApp();

const app = composeMiddlewares(newApp);

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
