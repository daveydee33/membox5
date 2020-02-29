const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route     GET auth/google
// @desc      Login with Google
// @access
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// @route     GET auth/google/callback
// @desc      Callback route after Google authenticates
// @access
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

// @route     GET auth/logout
// @desc      Logout
// @access
router.get('/logout', (req, res) => {
  console.debug('logging out user: ', req.user);
  req.logout();
  res.redirect('/');
});

// @route     GET auth/current_user
// @desc      Get current logged in user data
// @access    Restricted
router.get('/current_user', (req, res) => {
  if (!req.user) return res.status(400).send();

  // I only want to return limited data
  const { _id, googleId, name, email, image } = req.user;
  res.json({ _id, googleId, name, email, image });
});

module.exports = router;
