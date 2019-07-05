const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const router = express.Router();
// mongoose user schema
const UserSchema = require('../models/user/user');

// Sign Up (register) user account
router.post('/sign-up', (req, res) => {
  const user = new UserSchema({
    _id: new mongoose.Types.ObjectId(),
    //  так как создавать юзера можно не заполняя все параметры
    //  и мы не знаем какие имено тогда вставляем те что приходят
    ...req.query,
  });

  user.save()
    .then((result) => {
      res.status(201).json({
        massage: 'Created user successfully',
        createdUser: {
          name: result.name,
          email: result.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      // err email has to be unique
      if (err.errors.hasOwnProperty('email')) {
        res.status(400).json({ massage: 'Bed request' });
      } else {
        res.sendStatus(500).json({ err });
      }
    });
});


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
    console.log(body);

    // If Not Successful
    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: 'Failed captcha verification' });
    }

    // If Successful
    return res.json({ success: true, msg: 'Captcha passed' });
  });
});


// Log in user
router.post('/login', (req, res) => {
  res.send('login user');
});


module.exports = router;
