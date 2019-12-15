const express = require('express');
const connectDB = require('./config/db');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport'); // make sure to use this file, but we're not exporting anything from it, so we don't need to assign to any variable.

const app = express();

// Connect to MongoDB Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.COOKIE_KEY],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/api/items', require('./routes/items'));
app.use('/auth', require('./routes/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build')),
  );
}

const PORT = process.env.PORT || 5000; // process.env.PORT value will be set by Heroku.

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
