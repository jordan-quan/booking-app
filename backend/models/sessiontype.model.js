const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessiontypeSchema = new Schema({
  value: { type: String, required: true, unique: true },
  displayText: { type: String, required: true, unique: true },
  description: { type: String },
  duration: { type: Number, required: true }
});

const SessionType = mongoose.model('SessionType', sessiontypeSchema);

module.exports = SessionType;