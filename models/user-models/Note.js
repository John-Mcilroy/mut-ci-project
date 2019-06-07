const { Schema } = require('mongoose');

// Create Schema
const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  expireDate: {
    type: Date,
  }
});

module.exports = Note = mongoose.model('note', NoteSchema);
