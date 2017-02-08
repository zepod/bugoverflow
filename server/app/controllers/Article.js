const ArticleModel = require('../models/Article');

module.exports = {
  update: (articleId, updates) => {
    return new Promise((resolve, reject) => {
      ArticleModel
        .findAndModify({_id: articleId}, updates, {new: true}, resolve)
    })
  }
}
