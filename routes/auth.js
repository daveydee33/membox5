const express = require('express');
const router = express.Router();
const passport = require('passport');

// All routes here beging with /auth

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/items');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Get current logged in user data
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
