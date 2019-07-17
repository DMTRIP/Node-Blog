const express = require('express');
const multer = require('multer');
const Post = require('../models/mongodb/mongoose-models/post');
const User = require('../models/mongodb/mongoose-models/user');
const Comment = require('../models/mongodb/mongoose-models/comment');


const router = express.Router();
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');
const userControler = require('./controllers/userController');

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

// router.post('/image', upload.single('postImage'), (req, res) => {
//   console.log(req.file);
//   res.status(200).send();
// });

// / POST ROUTES ///

// Get blog page
router.get('/', postController.post_list);

// Get create post page
router.get('/post/create', postController.create_post_get);

// Post request to create post in Mongo
router.post('/post/create', postController.create_post_post);

// Get users posts page
router.get('/my-post', postController.user_post_list_page_get);

// GET users post by id
router.get('/my-post/page/:num', postController.user_post_list_get);

// Get single post page
router.get('/post/:id', postController.single_post);

// Post page pagination
router.get('/post/page/:num', postController.post_page_get);

// Delete one post
router.delete('/post/:id', postController.delete_post_delete);

/// APPROVE POST ///

// Create post on approve
router.post('/approve/post/create', postController.create_post_on_approve_post);

// Display user's post on approve page
router.get('/approve/post', postController.user_post_on_approve_page_get);

// Display post on approve for approvers
router.get('/for-approve/post', postController.post_for_approver_page_get);

// Public post button
router.post('/for-approve/post/:id/public', postController.approve_public_post_post);


// / COMMENT ROUTES ///

// POST create post
router.post('/post/comment/create', commentController.comment_post_create_post);

// GET comment by id
router.get('/post/comment/:id', commentController.comment_getOne_get);

// GET comment page for post
router.get('/post/:id/comment/page/:num', commentController.comment_page_get);

  /// USER ROUTS ///

router.get('/user/:id', userControler.get_one_user_get);

router.get('/test', (req, res) => {
  Post.find()
    .populate('users')
    .exec((err, doc) => {
      res.send(doc);
    });
});

module.exports = router;
