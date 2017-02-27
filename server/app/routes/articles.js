const router = require('express').Router()
// const querystring = require('querystring')
const errors = require('errors')
const ArticleModel = require('models/Article')

router.route('/')
  .get((req, res, next) => {
    ArticleModel
      .loadCollection(req.query)
      .then(articles => {
        if (articles.length) {
          return res
            .status(200)
            .json(articles)
        } else {
          errors.throw({error: {
            status: 404, message: `No such Articles found`
          }, res, next})
        }
      })
      .catch(err => {
        errors.throw({error: {
          status: 404, message: `ArticleCollection fetch failed`
        }, res, next, err})
      })
  })
router.route('/:articleId')
  .get((req, res, next) => {
    ArticleModel
      .load(req.params.articleId)
      .then(article => {
        return res
          .status(200)
          .json(article)
      })
      .catch(e => {
        errors.throw({error: {
          status: 404, message: `No such article to get`
        }, res, next, e})
      })
  })
  .post((req, res, next) => {
    ArticleModel
      .update(req.params.articleId, req.body)
      .then(article => {
          return res
            .status(200)
            .json(article)
      })
      .catch(e => {
        errors.throw({error: {
          status: 404, message: `No such article to update`
        }, res, next, e})
      })
  })

module.exports = router
