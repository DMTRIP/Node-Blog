const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const router = express.Router();
// mongoose user schema
const UserSchema = require('../models/user/user');


// Sign Up re-captcha verification
router.post('/sign-up-re-captcha', (req, res) => {
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
});


router.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/one/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserSchema.findById(id);

  if (user) {
    res.status(200).json({ massage: 'user found', user});
  } else {
    res.status(404).json({ massage: 'bad request' });
  }
});


module.exports = router;
