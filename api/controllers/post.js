const Post = require('../../models/post');

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
