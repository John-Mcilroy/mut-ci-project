const { Schema } = require('mongoose');

// Create Schema
const AmbientPickSchema = new Schema({
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

module.exports = AmbientPick = mongoose.model('ambientPick', AmbientPickSchema);
