const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// mongoose user schema
const UserSchema = require('../models/user/user');

// Sign Up (register) user account
router.post('/create', (req, res) => {
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

// Log in user
router.post('/login', (req, res) => {
  res.send('login user');
});


module.exports = router;
