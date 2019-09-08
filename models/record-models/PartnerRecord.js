const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PartnerRecordSchema = new Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'records'
  }]
});

module.exports = PartnerRecord = mongoose.model('partnerRecord', PartnerRecordSchema);
