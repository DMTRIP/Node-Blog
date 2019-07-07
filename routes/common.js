const express = require('express');
const path = require('path');
// mongoose schema
const Post = require('../models/post/post');
const Comment = require('../models/post/post-comment');
const User = require('../models/user/user');

const router = express.Router();

// get home page
router.get('/', (req, res) => {
  res.send('home page');
});

// get blog page
router.get('/blog', (req, res) => {
  Post.find()
    .then((docs) => {
      // делаем revers для того чтобы сначала выводить полседные посты
      res.render('blog', { post: docs.reverse() });
    });
});

router.get('/create-post', (req, res) => {
  res.render('create-post');
});

// get about page
router.get('/about', (req, res) => {
  res.send('about page');
});

// get contact page
router.get('/contact', (req, res) => {
  res.send('contact page');
});


// get single post page
router.get('/single-post/:id', async (req, res) => {
  // post id
  const { id } = req.params;
  // the post
  const post = await Post.findById(id);
  // post's comments
  const postId = String(post._id);
  const comments = await Comment.find({ postId }).exec();
  // comments' author
  const author = await User.findById(post.author);


  const { body } = post;
  //  new comments first
  comments.reverse();

// comments amount
const commetsAmt = comments.length;
  console.log(comments);
  const firsDiscripton = body.slice(0, body.length / 2);
  const secondDesription = body.slice(body.length / 2 + 1);
  res.render('single-post-1', {
    post, firsDiscripton, secondDesription, comments, commetsAmt,
  });
});


router.get('/my-posts', (req, res) => {
  const { id } = req.cookies;
  console.log(id);
  Post.find({ author: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.render('blog', { post: result });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});


module.exports = router;
