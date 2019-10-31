const express = require('express');
const connectDB = require('./config/db');

const app = express();

// TEST
// app.get('/', (req, res) => res.json({ msg: 'API server is running' }));

// Connect to MongoDB Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/items', require('./routes/items'));

const PORT = process.env.PORT || 5000; // process.env.PORT value will be set by Heroku.

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
