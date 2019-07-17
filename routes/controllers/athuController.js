const mongoose = require('mongoose');
const path = require('path');
const request = require('request');

const passport = require('passport');
const cookieParser = require('cookie-parser');
// mongoose schema
const Post = require('../../models/mongodb/mongoose-models/post');
const User = require('../../models/mongodb/user');

// Display registration (Sign Up) page
exports.registration_get = (req, res) => {
  res.render('signUp');
};

// Display login page
exports.login_get = (req, res) => {
  res.render('login');
};

// User registration ( create user account )
exports.user_signUp_post = async (req, res) => {
  const user = await User.create(req.body);
  if (!user) res.redirect('/registration');

  res.redirect('/login');
};

// Check user login info from login form
exports.user_login_post = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    console.log("cookies");
    console.log(`user: ${user}`);
    res.cookie('id', user._id, { maxAge: new Date(Date.now() + 100 * 1000 * 10 * 10) });

    if (!user) {
      return res.redirect('/');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

// Check re-captcha verification code
exports.re_captcha_post = (req, res) => {
  if (
    req.body.captcha === undefined
    || req.body.captcha === ''
    || req.body.captcha === null
  ) {
    return res.json({ success: false, msg: 'Please select captcha' });
  }

  // Secret Key
  const secretKey = '6LfgMqwUAAAAACtap3L3RcY-JKc0G7QYkln4-c9t';

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make Request To VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    // If Not Successful
    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: 'Failed captcha verification' });
    }

    // If Successful
    return res.status(200).json({ success: true, msg: 'Captcha passed' });
  });
};

// Account log out
exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect('/login');
};
