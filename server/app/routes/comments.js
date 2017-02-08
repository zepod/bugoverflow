const router = require('express').Router();
// const parseQuery = require('../utils').parseQuery;
const errors = require('../errors');
const mongoose = require('mongoose');
const Comment = require('../models/Comment');

router.post('/', (req, res, next) => {
  const newComment = new Comment();
  const {
    author,
    body
  } = req.body;
  newComment.author = author;
  newComment.body = body;

  newComment.save((err, comment) => {
    if (err) errors.throw(next, 400, err.message)
    res.status(200).send(comment);
  })
  mongoose.model('Article')
    .update()
})
