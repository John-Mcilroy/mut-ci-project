const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PartnerRecordSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Partner name was not supplied'],
  },
  number: {
    type: Number,
    validate: {
      validator: function(num) {
        return /^8/.test(num);
      },
      message: () => `Not a valid Partner Number`,
    },
    min: [ 8, 'Not a valid Partner Number.' ],
    max: [ 8, 'Not a valid Partner Number.' ],
    required: [true, 'Partner Number was not supplied']
  },
  dateRecord: {
    type: Schema.Types.ObjectId,
    ref: 'DateRecord'
  }
});

module.exports = PartnerRecord = mongoose.model('partnerRecord', PartnerRecordSchema);
