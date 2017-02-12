const router = require('express').Router()
const querystring = require('querystring')
const errors = require('errors')
const ArticleModel = require('models/Article')

router.route('/')
  .get((req, res, next) => {
    const options = querystring.parse(req.path)
    ArticleModel
      .loadCollection(['porn'])
      .then(articles => {
        return res
          .status(200)
          .json(articles)
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
