const Post = require('./mongoose-models/post');
const User = require('./mongoose-models/user');
require('../../config/mongodb-config');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

exports.all = async () => await Post.find().exec();

exports.findOneById = async id => await Post.findById(id);

exports.findPostByAuthor = async id => await Post.find({ author: id });

exports.create = async (id, data) => await new Post(data).save();

exports.update = (id, update) => Post.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => Post.remove({ _id: ObjectId(id) }).exec();

exports.allPostWithCommentPopulate = () => Post.find().populate('comments');

exports.allUsersPostWithCommentPopulate = id => Post.find({ author: id }).populate('comments');

exports.incrementPostViewById = async (id) => {
  const post = await Post.findById(id);
  post.views += 1;
  post.save();
};
