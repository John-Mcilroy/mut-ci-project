const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PerformanceSchema = new Schema({
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'partner',
    required: true
  },
  workCategory: {
    type: String,
    required: true
  },
  performance: {
    type: Number
  },
  direct: {
    type: Number
  },
  unitsPerHour: {
    type: Number
  },
  unitsTotal: {
    type: Number
  },
  date: {
    type: String
  }
});

module.exports = Performance = mongoose.model('performance', PerformanceSchema);
