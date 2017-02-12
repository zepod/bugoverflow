const express = require('express')
const routes = require('routes')
const errors = require('errors')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = function composeMiddlewares(app) {
  app.use(bodyParser.json())
  app.use('/api/', routes)
  app.use('/static', express.static(path.join(__dirname, '../build/static')))
  app.use((req, res, next) => {
    errors.throw({error: {
      status: 404, message: `No endpoint "${req.originalUrl}" exists`
    }, res, next})
  })
  app.use(errors.handle)
  return app
}
