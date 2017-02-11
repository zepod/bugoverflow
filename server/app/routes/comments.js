const router = require('express').Router();
const parseQuery = require('utils').parseQuery;
const errors = require('errors');
const mongoose = require('mongoose');
const CommentModel = require('models/Comment');
const ArticleModel = require('models/Article');

router.post('/:articleId', (req, res, next) => {
  CommentModel
    .postComment(req.body, next, res)
    .then(comment => {
      ArticleModel.update(req.params.articleId, comment._id);
    })
    .then((err, model) => {
      res.status(201).json({ok: true})
    }
  )
})

module.exports = router;
