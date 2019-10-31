const mongoose = require('mongoose');

// DB connection URI needs to be set in .env
// dotenv package will pick this up and put it in the process.env object
const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true // fix a Mongoose deprecation warning
    });
    console.log('MongoDB connected successfully :)');
  } catch (error) {
    console.error('Error connecting to MongoDB :(');
    console.log(error.message);
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
  });

  mongoose.connection.on('error', error => {
    console.error('Mongoose error: ', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('Mongoose disconnected');
  });
};

module.exports = connectDB;
