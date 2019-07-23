const Post = require('../../models/post');

exports.post_all_get = async (req, res) => {
  const post = await Post.all();
  res.json(post);
};