const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createTour ,getAllTours,deleteTour,getTour, updateTour, updateTourImages, searchTours } = require("../controllers/tourController");

// Use memory storage for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle multiple image fields
const cpUpload = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]);

// Route to create a tour
router.post("/tours", cpUpload, createTour);
router.get("/tours", getAllTours);
router.delete("/tours/:id", deleteTour);
router.get("/tours/:id", getTour);
router.put("/tours/:id",updateTour);
router.put("/tours/:id/images", cpUpload, updateTourImages);
router.get("/search", searchTours);


module.exports = router;
