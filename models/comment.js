const Comment = require('./schemas/comment');
const Post = require('./schemas/post');
const User = require('./schemas/user');
require('../config/mongodb-config');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

exports.all = async () => await Comment.find().exec();

exports.findOneById = async id => await Comment.findById(id).exec();

exports.findByPostId = async id => await Comment.find({ postId: id });

exports.create = async data => await Comment(data).save();

exports.update = (id, update) => Comment.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => Comment.deleteOne({ _id: ObjectId(id) });

exports.createToPost = async (postId, authorId, massage) => {

  const user = await User.findById(authorId);

  const commentData = {
    _id: new mongoose.Types.ObjectId(),
    postId,
    authorId,
    massage,
    authorAvatar: user.avatar,
    authorName: user.name,
  };

  const post = await Post.findById(postId);

  // create comment
  const comment = new Comment(commentData);
  post.comments.push(comment.id);
  post.save();
  return comment.save();
};

exports.pageWithAuthor = async (postId, num) => {
  return await Comment.find({ postId }).populate('users');
};
