const express = require('express');
const path = require('path');
const passport = require('passport');

const router = express.Router();

// get home page
router.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
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
router.get('/:id', (req, res) => {
  res.send('single post page');
});


// check user login info
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/home');
    });
  })(req, res, next);
});


module.exports = router;
