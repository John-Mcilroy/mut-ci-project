const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Partner = require('./Partner');


// Create Schema
const PartnerRecordSchema = new Schema({
  partner: {
    type: Schema.Types.ObjectId,
    ref: Partner,
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

module.exports = PartnerRecord = mongoose.model('partnerRecord', PartnerRecordSchema);
