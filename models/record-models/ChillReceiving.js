const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChillReceivingSchema = new Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partnerRecord'
  },
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
