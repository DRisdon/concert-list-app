const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

// sign in page

router.get('/login', (req, res) => {
  res.render('login');
});

// Sign up page.

router.get('/new', (req, res) => {
  res.render('signup');
});

// Post to create new user (params are username/password).

router.post('/new',
  passport.authenticate(
    'local-signup', {
        failureRedirect: '/users/new',
        successRedirect: '/shows'
    }
  )
);

// Post to login (params are username/password).

router.post('/login',
  passport.authenticate(
    'local-login', {
        failureRedirect: '/users/login',
        successRedirect: '/shows'
    }
));

// Logout.

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
