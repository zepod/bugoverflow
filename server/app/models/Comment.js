const mongoose = require('mongoose');
const errors = require('errors');

const Schema = mongoose.Schema;

// Schema
const CommentSchema = new Schema({
  author: { type : String, default : '', required: [true, 'Resource "author" is required']},
  body: { type : String, default : '', required: [true, 'Resource "body" is required']},
  created: { type : Date, default : Date.now }
});

// Validations
CommentSchema.path('author').required(true, 'Comment title cannot be blank');
CommentSchema.path('body').required(true, 'Comment body cannot be blank');

// Methods
CommentSchema.statics = {
  postComment: function(comment, next, res) {
    return new Promise((resolve, reject) => {
      return this.create(comment, (err, created) => {
        if (err) {
          errors.throw({error: {
            status: 400,
            message: `${err.errors.body.message}`
          }, res, next})
        } else {
          resolve(created);
        }
      })
    }).catch(err => {
      errors.throw({res, next, err})
    })
  }
}

module.exports = mongoose.model('Comment', CommentSchema);
