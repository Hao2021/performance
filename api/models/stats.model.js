const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statsSchema = new Schema({
  performance: { type: String, required: true },
  strength: { type: String, required: true },
  weakness: { type: String, required: true },
  journal: { type: String, required: true },
  rating: { type: String, required: true },
  // date: { type: Date, required: true },
}, {
  timestamps: true,
},{ typeKey: '$type' });

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;