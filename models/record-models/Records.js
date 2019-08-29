const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecordsSchema = new Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partnerRecord'
  },
  date: {
    type: Date,
    required: true 
  },
  chillPick: {
    type: Schema.Types.ObjectId,
    ref: 'ChillPick',
  },
  chillReceiving: {
    type: Schema.Types.ObjectId,
    ref: 'ChillReceiving',
  },
  frvPick: {
    type: Schema.Types.ObjectId,
    ref: 'FRVPick',
  },
  ambientPick: {
    type: Schema.Types.ObjectId,
    ref: 'AmbientPick',
  },
  overall: {
    performance: {
      type: Number,
      required: true,
    },
    direct: {
      type: Number,
      required: true,
    },
    unitsTotal: {
      type: Number,
      required: true,
    },
    unitsPH: {
      type: Number,
      required: true,
    }
  }
});

module.exports = Records = mongoose.model('Records', RecordsSchema);
