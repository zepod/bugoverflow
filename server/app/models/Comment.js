const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const CommentSchema = new Schema({
  author: { type : String, default : '', required: true},
  body: { type : String, default : '', required: true},
  created: { type : Date, default : Date.now }
});

// Methods
CommentSchema.methods = {
  postComment: function ({}) {

  }
}

// Validations
CommentSchema.path('author').required(true, 'Comment title cannot be blank');
CommentSchema.path('body').required(true, 'Comment body cannot be blank');

mongoose.model('Comment', CommentSchema);
