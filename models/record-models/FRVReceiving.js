const { Schema } = require('mongoose');

// Create Schema
const frvReceivingSchema = new Schema({
  unitsTotal: {
    type: Number,
    required: true,
  },
  unitsPH: {
    type: Number,
    required: true,
  }
});

module.exports = FRVReceiving = mongoose.model('frvReceiving', frvReceivingSchema);
