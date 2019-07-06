const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
// mongoose schema
const Post = require('../models/post/post');

const router = express.Router();

// get home page
router.get('/', (req, res) => {
  Post.find()
    .then((docs) => {
      console.log(docs);
      res.render('index', { post: docs.map(e => e) });
    });
});

// get blog page
router.get('/blog', (req, res) => {
  res.send('blog page');
});


// get about page
router.get('/about', (req, res) => {
  res.send('about page');
});

// get contact page
router.get('/contact', (req, res) => {
  res.send('contact page');
});

// get sign up page
router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../', '/public/reg-login-form/signUp.html'));
});

// get login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../', '/public/reg-login-form/login.html'));
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


// check user login info
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    console.log(1);
    res.cookie('id', user._id);

    if (!user) {
      return res.send(user);
    }

    console.log(user);
    // write user id in cookie
    const maxAge = 60 * 60 * 100 * 1000 * 1000 * 100000000000000;
    res.cookie('id', user._id, { maxAge });

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});


module.exports = router;
