const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: String,
  description: String
}, { _id: true }); // Ensure meals get their own _id

const tourMealsSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
    unique: true
  },
  meals: [mealSchema]
});

module.exports = mongoose.model("Meal", tourMealsSchema);
