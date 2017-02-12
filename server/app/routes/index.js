const Router = require('express').Router()
const articlesRoutes = require('routes/articles')
const commentsRoutes = require('routes/comments')

Router.get('/', (req, res) => {
  res.status(200).json({status: 200, message: 'Welcome to Bug Overflow API, start hacking :-)'})
})
Router.use('/articles', articlesRoutes)
Router.use('/comments', commentsRoutes)

module.exports = Router
