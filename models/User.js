const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  image: String,
  dateCreated: { type: Date, default: Date.now },
  allDetails: String // We can remove this later -- just testing to see what is the full value.
});

mongoose.model('users', userSchema);
// mongoose.model will tell Mongoose to create (or retrieve) a Collection named 'users' in the database.  It won't overwrite collections if it already exists.
