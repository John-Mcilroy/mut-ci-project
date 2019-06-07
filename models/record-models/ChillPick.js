const { Schema } = require('mongoose');

// Create Schema
const ChillPickSchema = new Schema({
  performance: {
    type: Number,
    required: true,
  },
  direct: {
    type: Schema.Types.Decimal128,
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
});

module.exports = ChillPick = mongoose.model('chillPick', ChillPickSchema);
