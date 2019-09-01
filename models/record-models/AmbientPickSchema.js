const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AmbientPickSchema = new Schema({
  performance: {
    type: Number,
  },
  direct: {
    type: Number,
  },
  unitsTotal: {
    type: Number,
  },
  unitsPH: {
    type: Number,
  }
});

module.exports = AmbientPickSchema;
