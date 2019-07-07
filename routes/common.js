const express = require('express');
const path = require('path');
// mongoose schema
const Post = require('../models/post/post');

const router = express.Router();

// get home page
router.get('/', (req, res) => {
  res.send('home page');
});

// get blog page
router.get('/blog', (req, res) => {
  Post.find()
    .then((docs) => {
      res.render('blog', { post: docs.map(e => e) });
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
router.get('/single-post/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ massage: 'Post not found' });
      }
      const { body } = doc;

      // dived description on two parts fro blog page
      const firsDiscripton = body.slice(0,body.length / 2);
      const secondDesription = body.slice(body.length / 2 + 1);
      res.render('single-post-1', { post: doc, firsDiscripton, secondDesription });
    });
});


router.get('/my-posts', (req, res) => {
  const { id } = req.cookies;
  console.log(id);
  Post.find({author: id})
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
