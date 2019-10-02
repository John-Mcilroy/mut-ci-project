const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PartnerSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: Number,
  }
});

module.exports = Partner = mongoose.model('partner', PartnerSchema);
