const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {constructQuery} = require('utils')
const Comment = require('models/Comment');

// Schema
const ArticleSchema = new Schema({
    title: { type: String, default: '' },
    body: { type: String, default: '' },
    comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
    categories: { type: [String], defualt: [] },
    images: { type: [String], defualt: [] },
    created: { type: Date, default: Date.now },
  }, { strict: true });

// Validation
ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');

// Statics
ArticleSchema.statics = {
  load: function(_id) {
    return this.findOne({ _id }).populate({
      path: 'comments',
      options: { sort: { created: -1 }}
    }).exec();
  },

  loadCollection: function(options = {}) {
    const query = constructQuery(options);
    const page = options.page || 0;
    const limit = options.limit || 30;
    const fields = options.fields;
    const sort = options.sorting || { createdAt: -1 };
    return this
        .find(query)
        .sort(sort)
        .select(fields)
        .limit(limit)
        .skip(limit * page)
        .exec();
  },

  update: function(articleId, commentId) {
    return new Promise((resolve, reject) => {
      const updateQuery = {
        $push: {
          comments: commentId,
        },
      };
      this.findByIdAndUpdate(
        articleId,
        updateQuery,
        { safe: true, upsert: true, new: true },
        resolve
      );
    });
  },
};

module.exports = mongoose.model('Article', ArticleSchema);
