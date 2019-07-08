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
router.get('/blog', async (req, res) => {
  let post;
  let comment;

  try {
    post = await Post.find({  }).exec();
    if (!post) return cb('no post found');
  } catch (err) {
    return cb('Unexpected error occurred');
  }

  try {
    comment = await Comment.find({}).exec();
    if (!comment) return cb('no post found');
  } catch (err) {
    return cb('Unexpected error occurred');
  }

  // post's comment amount
  post.map((pE) => {
    pE.commentAmt = 0;
    comment.map((cE) => {
      if (cE.postId == pE._id) {
        pE.commentAmt++;
      }
    });
  });
  post.reverse();
  res.render('blog', { post });
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


router.get('/my-posts', async (req, res) => {
  const { id } = req.cookies;
  let post;
  let comment;

  try {
    post = await Post.find({ author: id }).exec();
    if (!post) return cb('no post found');
  } catch (err) {
    return cb('Unexpected error occurred');
  }

  try {
    comment = await Comment.find({}).exec();
    if (!comment) return cb('no post found');
  } catch (err) {
    return cb('Unexpected error occurred');
  }

  // post's comment amount
  post.map((pE) => {
    pE.commentAmt = 0;
    comment.map((cE) => {
      if (cE.postId == pE._id) {
        pE.commentAmt++;
      }
    });
  });

  res.render('blog', { post });
});


module.exports = router;
