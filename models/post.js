const Post = require('./schemas/post');
const User = require('./schemas/user');
const PostOnApprove = require('./schemas/post_on_approve');
require('../config/mongodb-config');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

exports.all = async () => await Post.find().exec();

exports.findOneById = async id => await Post.findById(id);

exports.findPostByAuthor = async id => await Post.find({ author: id });

exports.create = async (req) => {
  // image for post
  const previewPath = req.file ? `/${req.file.path}` : '/uploads/default-images/postdefault.jpeg';
  const { title, body } = req.body;
  const { id } = req.params;

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    author: id,
    authorAvatar: '/uploads/default-images/profiledefault.png',
    title,
    body,
    preview: previewPath,
  });

  return post.save();
};

exports.update = (id, update) => Post.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => Post.remove({ _id: ObjectId(id) }).exec();

exports.myPost = async id => await Post.find({ author: id });

exports.recommended = async () => {
  const post = await Post.find();
  const recommended = [];

  for (let i = 0; i < 3; i++) {
    recommended.push(post[randomInteger(1, 4)]);
  }

  return recommended;
};
