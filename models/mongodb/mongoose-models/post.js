const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  // id user which send post
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: String,
  body: { type: String, maxLength: 40000 },
  // category tags for post
  tags: [String],
  preview: { type: String, default: '/uploads/default-images/postdefault.jpeg' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  authorAvatar: String,
  created: { type: Date, default: Date().toLocaleString('en-US', { hour12: false }) },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
