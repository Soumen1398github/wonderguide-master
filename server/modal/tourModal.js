const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  tourName: String,
  tourDescription: String,
  fromLocation: String,
  toLocation: String,
  lodgeType: String,
  lodgeName: String,
  lodgeAddress: String,
  transportType: String,
  transportDescription: String,
  transportRegNo: String,
  totalTourDays: Number,
  noOfTickets: Number,
  ticketPrice: String,
  specialNote: String,
  startTime: Date,
  endTime: Date,
  image1: String,
  image2: String,
  image3: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Tour", tourSchema);
