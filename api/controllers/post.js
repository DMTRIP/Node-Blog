const Post = require('../../models/post');
const User = require('../../models/user');
const Like = require('../../models/like');

exports.post_all_get = async (req, res) => {
  const post = await Post.all();
  res.json(post);
};

exports.post_create_post = async (req, res) => {
  try {
    await Post.create(req);
  } catch (e) {
    return res.status(500).send();
  }
  res.status(201).send();
};

exports.post_my_post_post = async (req, res) => {
  try {
    const post = await Post.myPost(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ msg: 'post not found' });
  }
};

exports.post_recommended_get = async (req, res) => {
  try {
    const post = await Post.recommended();
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ msg: 'recommended post not found' });
  }
};

exports.post_getOne_get = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.getSinglePost(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(404).send();
  }
};

exports.post_page_get = async (req, res) => {
  const { num } = req.params;
  try {
    const page = await Post.page(num * 10);
    res.status(200).json(page);
  } catch (e) {
    res.status(404).send();
  }
};

exports.post_myPost_page_get = async (req, res) => {
  const { num, id } = req.params;
  try {
    const page = await Post.myPostPage(num * 10, id);
    res.status(200).json(page);
  } catch (e) {
    res.status(404).send();
  }
};

// USER

exports.get_user_get = async (req, res) => {
  try {
    const user = await User.findOneById('5d2ed8ae4bd84bfe49e17985');
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ msg: 'user not found' });
  }
};

// LIKES

exports.setLikeToPost = async (req, res) => {
  const { authorId, postId } = req.params;
  const like = await Like.setLikeToPost(authorId, postId);
  res.status(200).json(like);
};

exports.deleteLike = async (req, res) => {
  const { authorId, postId } = req.params;
 const like = await Like.deleteLikeFromPost(authorId, postId);
 res.status(200).json(like);
};

exports.postWithLikePopulate = async (req, res) => {
  const post = await Post.postWithLikePopulate();
  res.send(post);
};