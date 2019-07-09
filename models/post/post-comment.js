const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = Schema({
  _id: Schema.Types.ObjectId,
  postId: {
    type: Schema.Types.Object, ref: 'Post', required: true, maxLength: 2000,
  },
  // id user which left comment
  author: {
    type: Schema.Types.Object, ref: 'User', required: true, maxLength: 2000,
  },
  // user comment
  massage: {
    type: String, minLength: 1, maxLength: 2000, required: true,
  },
  authorName: { type: String, maxLength: 100 },
  authorAvatar: { type: String, maxLength: 200 },
  created: { type: Date, default: Date.now() },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
