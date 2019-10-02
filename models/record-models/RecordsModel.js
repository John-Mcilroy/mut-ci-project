const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = require('./RecordSchema');

// Create Schema
const RecordSchema = new Schema({
  partner: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'partner'
  },
  date: {
    required: true,
    type: Date,
  },
  records: [RecordSchema]
});

module.exports = Records = mongoose.model('records', RecordSchema);