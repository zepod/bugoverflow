const router = require('express').Router();
const querystring = require('querystring');
const errors = require('../errors');
const ArticleModel = require('../models/Article');
const ArticleController = require('../controllers/Article');


router.route('/')
  .get((req, res, next) => {
    const options = querystring.parse(req.path);
    ArticleModel
      .loadCollection(options)
      .then(articles => {
        if (articles) {
          return res
          .status(200)
          .json(articles);
        } else {
          errors.throw({error: {
            status: 404, message: `No articles to get`
          }, res, next});
        }
      })
      .catch(e => {
        errors.throw({error: {
          status: 500, message: `Schema Error: Article.loadCollection failed`
        }, res, next, trueError: e});
      });
  })
router.route('/:articleId')
  .get((req, res, next) => {
    ArticleModel
      .load(req.params.articleId)
      .then(article => {
        if (article) {
          return res
          .status(200)
          .json(article);
        } else {
          errors.throw({error: {
            status: 404, message: `No such article to update`
          }, res, next});
        }
      })
      .catch(e => {
        console.log('one of eme')
        errors.throw({error: {
          status: 404, message: `No such article to update`
        }, res, next, e});
      })
  })
  .post((req, res, next) => {
    ArticleController
      .update(req.params.articleId, req.body)
      .then(article => {
        if (article) {
          return res
            .status(200)
            .json(article)
        } else {
          errors.throw({error: {
            status: 404, message: `No such article to update`
          }, res, next});
        }
      })
  })

module.exports = router;
