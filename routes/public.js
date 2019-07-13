const express = require('express');

const router = express.Router();

const authController = require('../routes/controllers/athuController');

// GET sign up page
router.get('/registration', authController.registration_get);

// GET login page
router.get('/login', authController.login_get);

// POST Sign Up (register) user account
router.post('/sign-up', authController.user_signUp_post);

// POST user login (check user data in login form)
router.post('/login', authController.user_login_post);

// POST check re-captcha verification code
router.post('/sign-up-re-captcha', authController.re_captcha_post);

// GET log out
router.get('/log-out', authController.log_out_get);

module.exports = router;
