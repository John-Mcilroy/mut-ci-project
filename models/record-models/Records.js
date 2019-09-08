const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbientPickSchema = require('./workCategories/AmbientPickSchema');
const ChillPickSchema = require('./workCategories/ChillPickSchema');
const FrvPickSchema = require('./workCategories/FrvPickSchema');
const ChillReceivingSchema = require('./workCategories/ChillReceivingSchema');
const AmbientPutawaySchema = require('./workCategories/AmbientPutawaySchema');
const LoadingSchema = require('./workCategories/LoadingSchema');

// Create Schema
const RecordSchema = new Schema({
  partnerNumber: Number,
  date: Date,
  ambientPick: AmbientPickSchema,
  chillPick: ChillPickSchema,
  frvPick: FrvPickSchema,
  chillReceiving: ChillReceivingSchema,
  ambientPutaway: AmbientPutawaySchema,
  loading: LoadingSchema
});

module.exports = Records = mongoose.model('records', RecordSchema);