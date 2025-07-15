const TourActivity = require("../modal/activityModal");
const mongoose = require("mongoose");

// Add activity to a tour
const addActivityToTour = async (req, res) => {
  const { tourId } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Activity name and description are required." });
  }

  try {
    let tourActivity = await TourActivity.findOne({ tourId });

    if (tourActivity) {
      tourActivity.activities.push({ name, description });
      await tourActivity.save();
    } else {
      tourActivity = new TourActivity({
        tourId,
        activities: [{ name, description }],
      });
      await tourActivity.save();
    }

    res.status(200).json({ message: "Activity saved", activities: tourActivity.activities });
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete activity from tour
const deleteActivityFromTour = async (req, res) => {
  const { tourId, activityId } = req.params;

  try {
    const tourActivity = await TourActivity.findOne({ tourId });
    if (!tourActivity) return res.status(404).json({ message: "Tour not found" });

    tourActivity.activities = tourActivity.activities.filter(
      (act) => act._id.toString() !== activityId
    );
    await tourActivity.save();

    res.status(200).json({ message: "Activity deleted", activities: tourActivity.activities });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all activities
const getTourActivities = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tourActivity = await TourActivity.findOne({ tourId });
    if (!tourActivity) return res.status(200).json([]); // Return empty array if no data

    res.status(200).json(tourActivity.activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addActivityToTour,
  deleteActivityFromTour,
  getTourActivities,
};
