const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbientPickSchema = require('./AmbientPickSchema');
const AmbientPutawaySchema = require('./AmbientPutawaySchema');
const ChillPickSchema = require('./ChillPickSchema');
const ChillReceivingSchema = require('./ChillReceivingSchema');
const FrvPickSchema = require('./FrvPickSchema');
const LoadingSchema = require('./LoadingSchema');

// Create Schema
const RecordsSchema = new Schema({
  chillPick: ChillPickSchema,
  chillReceiving: ChillReceivingSchema,
  frvPick: FrvPickSchema,
  ambientPick: AmbientPickSchema,
  ambientPutaway: AmbientPutawaySchema,
  loading: LoadingSchema
});

module.exports = RecordsSchema;