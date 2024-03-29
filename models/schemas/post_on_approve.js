const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const parse = require('../../parse');

const postSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  // id user which send post
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  authorAvatar: String,
  // post view
  title: String,
  body: { type: String, maxLength: 40000 },
  // other data
  tags: [String],
  preview: { type: String, default: '/uploads/default-images/postdefault.jpeg' },
  created: { type: String, default: parse.date() },
});

const Post = mongoose.model('PostOnApprove', postSchema);
module.exports = Post;
