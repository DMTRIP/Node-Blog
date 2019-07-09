const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const cookieParser = require('cookie-parser');
// mongoose schema
const Post = require('../models/post/post');

const router = express.Router();
const UserSchema = require('../models/user/user');

// get sign up page
router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../', '/public/reg-login-form/signUp.html'));
});

// get login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../', '/public/reg-login-form/login.html'));
});

// Sign Up (register) user account
router.post('/sign-up', (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  const user = new UserSchema({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
  });

  user.save((err, result) => {
    if(err) {res.status(500)};
    res.redirect('/login');
  })

});


// check user login info
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/');
    }
    res.cookie('id', user._id,{maxAge: new Date(Date.now() + 100 * 1000)});

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
