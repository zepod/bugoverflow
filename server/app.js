const express = require('express');
const config = require('./config');

function initApp(cb) {
  const app = express();
  const port = config.port || 8080;

  app.disable('x-powered-by');

  app.listen(port, () => {
    console.log('===> Server is listening on port', port);
  })

  if (cb) cb();
  return app;
}
module.exports = initApp;
