const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('items', ItemSchema);
