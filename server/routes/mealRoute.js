const express = require("express");
const {
  addMealsToTour,
  getMealsByTourId,
  deleteMealFromTour
} = require("../controllers/mealController");

const router = express.Router();

router.post("/:tourId", addMealsToTour);
router.get("/:tourId", getMealsByTourId);
router.delete("/:tourId/:mealId", deleteMealFromTour); // 🔁 changed from index to mealId

module.exports = router;
