const express = require('express');
const routes = require('../routes');
const errors = require('../errors');
const path = require('path');

module.exports = function composeMiddlewares(app) {
  app.use('/api/', routes);
  app.use('/static', express.static(path.join(__dirname, '../build/static')));
  app.use((req, res, next) => {
    console.log('404')
    errors.throw({error: {
      status: 404, message: `No endpoint "${req.originalUrl}" exists`
    }, res, next})
  });
  app.use(errors.handle)
  return app;
}
