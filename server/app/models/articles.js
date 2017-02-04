const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const ArticleSchema = new Schema({
  title: { type : String, default : '', trim : true },
  body: { type : String, default : '', trim : true },
  comments: [{
    body: { type: String, default: '', trim : true},
    author: { type: String, default: '', trim : true},
    created: { type : Date, default : Date.now }
  }],
  tags: {type: [String], defualt: []},
  blocks: {type: [String], defualt: []},
  images: {type: [String], defualt: []},
  created: { type : Date, default : Date.now }
});

/**
 * Validations
 */

ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');

/**
 * Methods
 */

ArticleSchema.methods = {
  // /**
  //  * Add comment
  //  *
  //  * @param {User} user
  //  * @param {Object} comment
  //  * @api private
  //  */
  //
  addComment: function (user, comment) {
    this.comments.push({
      body: comment.body,
      author: user._id
    });

    return this.save();
  },

};

/**
 * Statics
 */

ArticleSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (_id) {
    return this.findOne({ _id })
      .exec();
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @api private
   */

  loadCollection: function (options = {}) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    const sort = options.sorting || { createdAt: -1 }
    return this.find(criteria)
      .sort(sort)
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

mongoose.model('Article', ArticleSchema);
