
const Like = require('./schemas/like');
const Post = require('./post');
const User = require('./user');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

exports.setLikeToPost = async (authorId, postId) => {
  const like = new Like({
    _id: new mongoose.Types.ObjectId(),
    item: mongoose.Types.ObjectId(postId),
    author: mongoose.Types.ObjectId(authorId),
  });

  try {
    const result = await like.save();
    const post = await Post.findOneById(postId);
    post.likes.push(mongoose.Types.ObjectId(result.id));
    return await post.save();
  } catch (e) {
    console.log(e);
  }


};

exports.deleteLikeFromPost = async (authorId, postId) => {
 return await  Like.deleteOne({ author: ObjectId(authorId), item: ObjectId(postId) });
};