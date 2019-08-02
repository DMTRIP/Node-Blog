const User = require('../../models/user');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const request = require('request');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const config = require('../../config/config');

// mongoose schema
// const Post = require('../../models/mongodb/mongoose-models/post');
// const User = require('../../models/mongodb/user');

// User registration ( create user account )
exports.user_signUp_post = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOneByEmail(email);

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User with this email address already exists' }] });
    }

    // Get users gravatar\
    gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    await User.create(req.body);
    res.status(201).json({ massage: 'user has been created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Check user login info from login form
exports.user_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOneByEmail(email);

    if (!user) return res.status(400).json({ msg: 'invalid login or password' });

    const isMath = await bcrypt.compare(password, user.password);

    if (!isMath) return res.status(400).json({ msg: 'invalid login or password' });


    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, id: user.id });
    });
  } catch (err) {

  }
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
      return res.status(404).json({ success: false, msg: 'Failed captcha verification' });
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

exports.client_auth_get = (req, res) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  // Verify jwt
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded.user;
    res.status(200).json({ msg: 'success auth' });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

