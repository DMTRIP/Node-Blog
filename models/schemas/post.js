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
  preview: { type: String, default: '/uploads/default-images/postdefault.jpeg' },

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  views: { type: Number, default: 0 },

  created: { type: String, default: parse.date() },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
