const Comment = require('./mongoose-models/comment');
const Post = require('./mongoose-models/post');
const User = require('./mongoose-models/user');
require('../../config/mongodb-config');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

exports.all = async () => await Comment.find().exec();

exports.findOneById = async id => await Comment.findById(id).exec();

exports.findByPostId = async id => await Comment.find({ postId: id });

exports.create = async data => await Comment(data).save();

exports.update = (id, update) => Comment.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => Comment.deleteOne({ _id: ObjectId(id) });

exports.createToPost = async (postId, authorId, massage) => {
  const post = await Post.findById(postId).exec();
  const user = await User.findById(global.userId).exec();
  // object data template for mongoose comment schema
  const commentData = {
    _id: new mongoose.Types.ObjectId(),
    postId,
    authorId,
    massage,
    authorAvatar: user.avatar,
    authorName: user.name,
  };

  // create comment
  const comment = new Comment(commentData);
  comment.save((err) => { if (err) return err; });

  return comment._id;
};
