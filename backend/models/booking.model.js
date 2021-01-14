const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  email: { type: String, required: true, unique: false },
  type: { type: String, required: true, unique: false },
  date: { type: Date, required: true, unique: true },
  duration: { type: Number, required: true }
},
  {
    timestamps: true
  });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;