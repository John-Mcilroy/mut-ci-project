const { Schema } = require('mongoose');

// Create Schema
const UserSchema = new Schema({
  _id: { 
    type: Schema.Types.ObjectId, 
    required: true,
  },
  name: { 
    type: String, 
    required: true,
  },
  password: { 
    type: String, 
    required: true,
    trim: true,
  },
  refWord: { 
    type: String, 
    required: true,
  },
  privateWord: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true,
  },
  notes: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Note',
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo',
  }]
});

module.exports = User = mongoose.model('user', UserSchema);
