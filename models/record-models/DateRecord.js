const { Schema } = require('mongoose');

// Create Schema
const DateRecordSchema = new Schema({
  chillPick: [{
    type: Schema.Types.ObjectId,
    ref: 'ChillPick',
  }],
  chillReceiving: [{
    type: Schema.Types.ObjectId,
    ref: 'ChillReceiving',
  }],
  frvPick: [{
    type: Schema.Types.ObjectId,
    ref: 'FRVPick',
  }],
  frvReceiving: [{
    type: Schema.Types.ObjectId,
    ref: 'FRVReceiving',
  }],
  ambientPick: [{
    type: Schema.Types.ObjectId,
    ref: 'AmbientPick',
  }],
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

module.exports = DateRecord = mongoose.model('dateRecord', DateRecordSchema);
