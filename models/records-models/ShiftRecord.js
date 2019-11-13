const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ShiftRecordSchema = new Schema({
  workCategory: {
    type: String,
    required: true
  },
  performance: {
    type: Number
  },
  unitsPerHour: {
    type: Number
  },
  date: {
    type: String
  }
});

module.exports = ShiftRecord = mongoose.model('shiftRecord', ShiftRecordSchema);
