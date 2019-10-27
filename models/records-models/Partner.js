const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PartnerSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  number: { 
    type: String, 
    required: true,
    trim: true,
  }
});

module.exports = Partner = mongoose.model('partner', PartnerSchema);
