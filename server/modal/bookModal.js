// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
  bookedAt: { type: Date, default: Date.now },
  numberOfTickets: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  members: [
    {
      name: String,
      age: Number,
      gender: String,
    },
  ],
});

module.exports = mongoose.model("Booking", bookingSchema);
