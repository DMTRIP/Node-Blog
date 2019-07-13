const mongoose = require('mongoose');
const Post = require('../../models/mongodb/post');
const Comment = require('../../models/mongodb/comment');
const User = require('../../models/mongodb/user');

// Display list of all posts
exports.post_list = async (req, res) => {
  const post = await Post.allPostWithCommentPopulate();
  if(post === []) res.status(404).json({massage: 'post not found'});

  post.reverse();

  res.render('blog', { post });
};

// Display list of all user's posts
exports.user_post_list = async (req, res) => {
  const { id } = req.cookies;

  const post = await Post.findPostByAuthor(id);
  const comment = await Comment.all();

  // post's comment amount
  post.map((pE) => {
    pE.commentAmt = 0;
    comment.map((cE) => {
      if (cE.postId == pE._id) {
        pE.commentAmt++;
      }
    });
  });

  post.reverse();

  res.render('my-posts', { post });
};

// Display single post
exports.single_post = async (req, res) => {
  // post id
  const { id } = req.params;
  // the post
  const post = await Post.findOneById(id);
  // post's comments
  const postId = String(post._id);

  const comments = await Comment.findByPostId(postId);

  const { body } = post;
  //  new comments first
  comments.reverse();

  console.log(comments);
  const firsDiscripton = body.slice(0, body.length / 2);
  const secondDesription = body.slice(body.length / 2 + 1);
  res.render('single-post-1', {
    post, firsDiscripton, secondDesription, comments,
  });
};

// Display page for creating post
exports.create_post_get = async (req, res) => {
  res.render('create-post');
};

// Handle post create on Post
exports.create_post_post = async (req, res) => {
  // user id
  const { id } = req.cookies;
  const user = await User.findOneById(id);

  // image for post
  let previewPath;
  if (req.body.path) {
    previewPath = req.file.path ? req.file.path : '/uploads/default-images/postdefault.jpeg';
  };

  // data post model
  const post = {
    _id: new mongoose.Types.ObjectId(),
    // id user which send post
    author: id,
    authorAvatar: user.avatar,
    ...req.body,
    preview: previewPath,
  };

  // create post
  Post.create(id, post)
    .catch(err => {
      console.log(err);
      return res.status(500);
    });

  console.log(post);

  res.status(201).send();
};

// Handle post delete on Post
exports.delete_post_delete = async (req, res) => {
  const { id } = req.params;

  Post.delete(id)
    .catch((err) => {
      console.log(err);
    });

  res.status(204).send();
};

// return post page (10 posts)
exports.post_page_get = async (req, res) => {
  const { num } = req.params;

  const post = await Post.all()
    .catch(err => res.status(404).json({ massage: 'page not found' }));

  const comment = await Comment.all()
    .catch((err) => {
      console.log(err);
      res.status(500);
    });

  // ten posts
  const page = [];

  let postCommentCounter = 0;
  // amt = amount
  const postWithAmt = post.map((pE) => {
    comment.map((cE) => {
      if (cE.postId == pE._id) {
        postCommentCounter++;
      }
    });
    return { post: pE, amt: postCommentCounter };
  });


  for (let i = num * 10; i < (num * 10) + 10; i++) {
    if (postWithAmt[i] !== null) {
      page.push(postWithAmt[i]);
    }
  }

  page.reverse();

  console.log(page);
  res.status(200).json({ page });
};

