const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  expires: {
    type: Date,
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);
