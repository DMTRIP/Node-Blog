const express = require('express');
const multer = require('multer');

const router = express.Router();
const postController = require('../controllers/post');


// take images from request with multer
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

router.get('/post', postController.post_all_get);

router.post('/post/create', upload.single('postImage'), postController.post_create_post);

router.get('/user/:id/post', postController.post_my_post_post);

module.exports = router;
