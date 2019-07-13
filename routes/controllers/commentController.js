const mongoose = require('mongoose');
const Post = require('../../models/mongodb/post');
const Comment = require('../../models/mongodb/comment');
const MongoPost = require('../../models/mongodb/mongoose-models/post');

// create post method post
exports.comment_post_create_post = async (req, res) => {
  // post id and massage
  const { massage, id } = req.body;

  const authorId = req.cookies.id;

  const commentId = await Comment.createToPost(id, authorId, massage);

  res.status(201).json({ comment: commentId });
};

// send comment by id
exports.comment_getOne_get = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOneById(id)
    .catch((err) => { if (err) return res.status(404).json({ massage: 'post not found' }); });
  console.log(comment);
  res.status(200).json({ comment });
};

// return 10 comments for certain post
exports.comment_page_get = async (req, res) => {
  const { id, num } = req.params;

  const comments = await Comment.findByPostId(id);
  if (!comments) res.status(404).json({ massage: `comment for post: ${id} not found` });

  // ten posts
  const page = [];

  for (let i = num * 10; i < (num * 10) + 10; i++) {
    console.log(comments[i]);
    if (comments[i] !== undefined) {
      page.push(comments[i]);
    }
  }

  page.reverse();

  console.log(page);
  res.status(200).json({ page });
};
