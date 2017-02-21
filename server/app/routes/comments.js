const router = require('express').Router()
const CommentModel = require('models/Comment')
const ArticleModel = require('models/Article')

router.post('/:articleId', (req, res, next) => {
  let pendingComment = {};
  CommentModel
    .postComment(req.body, next, res)
    .then(comment => {
      pendingComment = comment
      return ArticleModel.update(req.params.articleId, comment._id)
    })
    .then((err) => {
      if (!err) res.status(201).json({ok: true, comment: pendingComment})
    })
})

module.exports = router
