const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecordSchema = new Schema({
  workCategory: {
    required: true,
    type: String
  },
  performance: {
    required: true,
    type: Number,
  },
  direct: {
    required: true,
    type: Number,
  },
  unitsPerHour: {
    required: true,
    type: Number,
  },
  unitsTotal: {
    required: true,
    type: Number,
  },
});

module.exports = RecordSchema;
