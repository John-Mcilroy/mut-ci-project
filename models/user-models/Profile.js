const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  notes: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Note',
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);