const mongoose = require("mongoose");
const Meal = require("../modal/mealModal");

// Add meal to a tour
const addMealsToTour = async (req, res) => {
  const { tourId } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Meal name and description are required." });
  }

  try {
    const tourObjectId = new mongoose.Types.ObjectId(tourId);

    let mealDoc = await Meal.findOne({ tourId: tourObjectId });

    if (mealDoc) {
      mealDoc.meals.push({ name, description });
      await mealDoc.save();
    } else {
      mealDoc = new Meal({
        tourId: tourObjectId,
        meals: [{ name, description }],
      });
      await mealDoc.save();
    }

    res.status(200).json({ message: "Meal saved", meals: mealDoc.meals });
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete meal from tour
const deleteMealFromTour = async (req, res) => {
  const { tourId, mealId } = req.params;

  try {
    const tourObjectId = new mongoose.Types.ObjectId(tourId);

    const mealDoc = await Meal.findOne({ tourId: tourObjectId });
    if (!mealDoc) return res.status(404).json({ message: "Tour not found" });

    mealDoc.meals = mealDoc.meals.filter(meal => meal._id.toString() !== mealId);
    await mealDoc.save();

    res.status(200).json({ message: "Meal deleted", meals: mealDoc.meals });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all meals for a tour
const getMealsByTourId = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tourObjectId = new mongoose.Types.ObjectId(tourId);

    const mealDoc = await Meal.findOne({ tourId: tourObjectId });
    // console.log("meals", mealDoc);
    if (!mealDoc) return res.status(200).json([]);

    res.status(200).json({meals: mealDoc.meals});
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addMealsToTour,
  deleteMealFromTour,
  getMealsByTourId,
};
