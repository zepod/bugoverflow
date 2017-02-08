const Router = require('express').Router();
const articlesRoutes = require('./articles');
const commentsRoutes = require('./comments');

Router.get('/health-check', (req, res) => {
  res.status(200).send('OK')
})
Router.use('/articles', articlesRoutes);
// Router.use('/api/comments', commentsRoutes);

module.exports = Router;
