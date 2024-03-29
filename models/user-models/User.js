const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  password: { 
    type: String, 
    required: true,
    trim: true,
  }
});

module.exports = User = mongoose.model('user', UserSchema);
