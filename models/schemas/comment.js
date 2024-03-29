const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const parse = require('../../parse');

const commentSchema = Schema({
  _id: Schema.Types.ObjectId,
  postId: {
    type: Schema.Types.Object, ref: 'Post', required: true,
  },
  // id user which left comment
  authorId: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
  },
  // user comment
  massage: {
    type: String, minLength: 1, maxLength: 2000, required: true,
  },

  authorAvatar: String,
  authorName: String,

  created: { type: String, default: parse.date() },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
