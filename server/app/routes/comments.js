const router = require('express').Router()
const CommentModel = require('models/Comment')
const ArticleModel = require('models/Article')

router.post('/:articleId', (req, res, next) => {
  CommentModel
    .postComment(req.body, next, res)
    .then(comment => {
      return ArticleModel.update(req.params.articleId, comment._id)
    })
    .then((err) => {
      res.status(201).json({ok: true})
    })
})

module.exports = router
