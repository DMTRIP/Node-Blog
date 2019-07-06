const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  // id user which send post
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: String,
  description: { type: String, maxLength: 600 },
  // category tags for post
  tags: [String],
  preview: {type: String, default: '/uploads/default-images/postdefault.jpeg'},
  authorAvatar: {type: String, default: '/uploads/default-images/profiledefault.png'},
  authorName: {type: String, maxLength: 40},
  created: { type: Date, default: Date().toLocaleString('en-US', { hour12: false }) },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
