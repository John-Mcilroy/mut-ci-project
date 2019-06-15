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
  },
  reference: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
  },
  privateWord: { 
    type: String,
    lowercase: true,
    trim: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
