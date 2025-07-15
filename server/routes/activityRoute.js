const express = require("express");
const {
  addActivityToTour,
  deleteActivityFromTour,
  getTourActivities,
} = require("../controllers/activityController");

const router = express.Router();

router.post("/:tourId/activities", addActivityToTour);
router.delete("/:tourId/activities/:activityId", deleteActivityFromTour);
router.get("/:tourId/activities", getTourActivities);

module.exports = router;
