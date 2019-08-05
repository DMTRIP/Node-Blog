const express = require('express');
const multer = require('multer');

const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const authController = require('../controllers/athu-controller');


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

router.post('/user/:id/post/create', upload.single('postImage'), postController.post_create_post);

router.get('/post/:id', postController.post_getOne_get);

router.get('/post/page/:num', postController.post_page_get);

router.get('/user/:id/post/page/:num', postController.post_myPost_page_get);

// user
router.get('/user/:id', postController.get_user_get);

router.get('/user/:id/post', postController.post_my_post_post);

router.get('/user/post/recommended', postController.post_recommended_get);

router.post('/login', authController.user_login_post);

router.post('/sign-up', authController.user_signUp_post);



// Likes

router.post('/post/like/:authorId/:postId', postController.setLikeToPost);

router.get('/test', postController.postWithLikePopulate);

router.delete('/user/like/:authorId/:postId', postController.deleteLike);

// auth

router.post('/re-captcha', authController.re_captcha_post);


module.exports = router;
