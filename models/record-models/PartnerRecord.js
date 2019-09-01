const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecordsSchema = require('./Records');

// Create Schema
const PartnerRecordSchema = new Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  records: [RecordsSchema]
});

module.exports = PartnerRecord = mongoose.model('partnerRecord', PartnerRecordSchema);
