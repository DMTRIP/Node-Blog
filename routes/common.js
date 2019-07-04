const express = require('express');

const router = express.Router();

// get home page
router.get('/', (req, res) => {
  res.send('home page');
});

// get blog page
router.get('/blog', (req, res) => {
  res.send('blog page');
});

// get single post page
router.get('/:id', (req, res) => {
  res.send('single post page');
});

// get about page
router.get('/about', (req, res) => {
  res.send('about page');
});

// get contact page
router.get('/contact', (req, res) => {
  res.send('contact page');
});

// get sign up page
router.get('/registration', (req, res) => {
  res.sendFile('signUp.html');
});

module.exports = router;
