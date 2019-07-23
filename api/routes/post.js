const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/post', postController.post_all_get);

module.exports = router;
