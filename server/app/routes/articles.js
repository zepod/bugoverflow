const routes = require('express').Router();
const mongoose = require('mongoose');
const querystring = require('querystring');


routes.get('/articles', (req, res, next) => {
  const options = querystring.parse(req.path);
  mongoose
    .model('Article')
    .loadCollection(options)
    .then(data => {
      return res
        .status(200)
        .json(data);

    })
    .catch(e => {
      next(e);
    });
    next()
});

module.exports = routes;
