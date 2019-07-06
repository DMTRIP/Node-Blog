const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// mongoose schemas
const Post = require('../models/post/post');
const User = require('../models/user/user');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    //  file size max 5mb
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

const router = express.Router();

// get all post from db
router.get('/', (req, res) => {
  res.send('all post from db');
});

// get single post by id
router.get('/:id', (req, res) => {
  res.send('single post by id');
});

// create new post
router.post('/create', upload.single('postImage'), async (req, res) => {
  const { id } = req.body;
  console.log(id);
  User.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ massage: 'user not found' });
      }
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        author: id,
        preview: req.file.path,
        ...req.body,
      });
      post.save((err, result) => {
        console.log(result);
          res.status(201).json({massage: 'post created successfully'});
      })
    });

});

// edit post
router.put('/edit', (req, res) => {
  res.send('edit post');
});

// delete post by id
router.delete('/del/:id', (req, res) => {
  res.send('delete post');
});

module.exports = router;
