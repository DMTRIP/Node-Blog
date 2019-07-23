const Post = require('./schemas/post');
const User = require('./schemas/user');
const PostOnApprove = require('./schemas/post_on_approve');
require('../config/mongodb-config');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

exports.all = async () => await Post.find().exec();

exports.findOneById = async id => await Post.findById(id);

exports.findPostByAuthor = async id => await Post.find({ author: id });

exports.create = async (req) => {
  // image for post
  const previewPath = req.file ? `/${req.file.path}` : '/uploads/default-images/postdefault.jpeg';

  // user id
  const { id } = req.cookies;

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    authorAvatar: '/uploads/default-images/profiledefault.png',
    preview: '/uploads/default-images/postdefault.png',
    title: 'How Did Van Gogh\'s Turbulent Mind Depict One of the Most Complex Concepts in Math?',
    comments: [1,2,3],
    likes: [1,2,3],
    views: 10,
  });

  post.save((err, result) => {
    if (err) console.log(err);
    console.log(`result: ${result}`);
  });
};

exports.update = (id, update) => Post.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => Post.remove({ _id: ObjectId(id) }).exec();

exports.allPostWithCommentPopulate = () => Post.find().populate('comments').exec();

exports.allUsersPostWithCommentPopulate = id => Post.find({ author: id }).populate('comments');

exports.incrementPostViewById = async (id) => {
  const post = await Post.findById(id);
  post.views += 1;
  post.save();
};

// / APPROVE POST ///

exports.allApprovePost = async () => await PostOnApprove.find().exec();

// create post in collection post on approve
exports.createPostOnApprove = async (id, data) => await new PostOnApprove(data).save();

exports.allApprovePostByAuthorId = async id => await PostOnApprove.find({ author: id }).exec();

// take post from PostOnApprove create the same in posts (only id is other) and delete current post from PostOnApprove
exports.approvePublicPost = async (id) => {
  const postApprove = await PostOnApprove.findById(id);
  console.log(PostOnApprove);
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    author: postApprove.author,
    authorAvatar: postApprove.authorAvatar,
    title: postApprove.title,
    postImage: postApprove.postImage,
    body: postApprove.body,
    preview: postApprove.preview,
  });

  post.save()
    .catch(err => false);

  const del = await PostOnApprove.deleteOne({ _id: ObjectId(id) }).exec()
    .catch(err => false);
};
