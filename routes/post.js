const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// mongoose schemas
const Post = require('../models/post/post');
const User = require('../models/user/user');
const Comment = require('../models/post/post-comment');

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
// router.get('/:id', (req, res) => {
//   res.send('single post by id');
// });

// create new post
router.post('/create', upload.single('postImage'), async (req, res) => {
  const { id } = req.cookies;
  // почемуто не предаатся id нужно это выяснить
  console.log(req.body);
  // image for post
  let previewPath;
  if (req.body.path) {
    previewPath = req.file.path ? req.file.path : '/uploads/default-images/postdefault.jpeg';
  } else {
    previewPath = '/uploads/default-images/postdefault.jpeg';
  }
  console.log(id);

  User.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ massage: 'user not found' });
      }
      // divide tags string by words
      // const tags = req.body.tags.split(' ');
      console.log(req.body);
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        author: id,
        preview: previewPath,
        authorName: doc.name,

      });
      post.save((err, result) => {
        console.log(result);
        res.status(201).json({ massage: 'post created successfully' });
      });
    });
});

// get all comments to post
router.get('/comments', (req, res) => {
  res.send('all comments');
});

// add comment to post
router.post('/comment', (req, res) => {
  // post id and massage
  const { massage, id } = req.body;


  Post.findById(id)
    .then(({
      id, author, authorName, authorAvatar,
    }) => {
      console.log(authorName);
      const comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        postId: id,
        author,
        authorName,
        authorAvatar,
        massage,
      });
      comment.save((err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ err: 'err' });
        }
        res.status(200).json({ massage: 'comment has been added', author });
      });
    })
    .catch(err => console.log(err));
});

router.get('/comment/last/:postId', async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId }).exec();
  // convert object to arr and return last comment
  const commentArr = Object.keys(comments).map(i => comments[i]);
  // last comment
  const comment = commentArr[commentArr.length - 1];

  if (comments) {
    res.status(200).json({ massage: `last comment for post: ${postId} found`, comment: comment });
  } else {
    res.status(404).json({ massage: `comments with id: ${postId} not found` });
  }
});

// get one post
router.get('/one/:id', async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post) {
    res.status(200).json({ massage: 'post found', post });
  } else {
    res.status(404).json({ massage: 'post not found' });
  }
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
