const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChillReceivingSchema = new Schema({
  unitsTotal: {
    type: Number,
    required: true,
  },
  unitsPH: {
    type: Number,
    required: true,
  }
});

module.exports = ChillReceiving = mongoose.model('chillReceiving', ChillReceivingSchema);
