const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // This is the Mongo ID, _not_ the Google ID
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true // see: Fixing Heroku Proxy Issues
    },

    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // We already have a record for that profile ID
        done(null, existingUser); // Call the 'done' callback to tell Passport that we did what we wanted, and to continue with the authentication process.  Return 'null' errors, and the existingUser.
      } else {
        // No user record for this ID, we need to make a new record.
        const newUser = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          allDetails: JSON.stringify(profile) // I don't need all this data
        }).save();

        done(null, newUser);
      }
    }
  )
);
