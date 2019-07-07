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
      console.log(docs);
      res.render('index', { post: docs.map(e => e) });
    });
});

router.get('/create-post', (req,res) => {
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
      console.log(doc);
      const { description } = doc;
      // dived description on two parts fro blog page
      const firsDiscripton =  description.slice(0, (description.length / 2));
      const secondDesription = description.slice((description.length / 2 + 1));
        res.render('single-post-1', { post: doc,firsDiscripton,secondDesription });
    });
});


router.get('/my-posts', (req,res) => {
  const {id} = req.cookies;
  console.log(id);
  Post.find({author: id})

});



module.exports = router;
