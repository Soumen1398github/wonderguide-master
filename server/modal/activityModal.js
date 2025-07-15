const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const tourActivitySchema = new mongoose.Schema({
  tourId: { type: String, required: true },
  activities: [activitySchema],
});

module.exports = mongoose.model("TourActivity", tourActivitySchema);
