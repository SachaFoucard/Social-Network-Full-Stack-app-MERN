const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorImg: {
    type: String,
    required: false
  },
  createdAt: {
    type: String,
    default: Date.now,
    required: false
  }
});

const Post = mongoose.model('Posts', postSchema)
module.exports = Post