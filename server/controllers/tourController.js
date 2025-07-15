const Tour = require("../modal/tourModal");
const uploadImageCloudinary = require("../middlware/multerMiddleware"); // assuming this is your function
const mongoose = require("mongoose");
const createTour = async (req, res) => {
  try {
    const {
      userId, // 🔹 Extract userId from the request body
      tourName,
      tourDescription,
      fromLocation,
      toLocation,
      lodgeType,
      lodgeName,
      lodgeAddress,
      transportType,
      transportDescription,
      transportRegNo,
      totalTourDays,
      noOfTickets,
      ticketPrice,
      specialNote,
      startTime,
      endTime,
    } = req.body;

    const images = req.files;

    const image1Url = images?.image1?.[0]
      ? await uploadImageCloudinary(images.image1[0])
      : null;
    const image2Url = images?.image2?.[0]
      ? await uploadImageCloudinary(images.image2[0])
      : null;
    const image3Url = images?.image3?.[0]
      ? await uploadImageCloudinary(images.image3[0])
      : null;

    // ✅ Create the new tour with the guide's userId
    const tour = new Tour({
      user: new mongoose.Types.ObjectId(userId),
      tourName,
      tourDescription,
      fromLocation,
      toLocation,
      lodgeType,
      lodgeName,
      lodgeAddress,
      transportType,
      transportDescription,
      transportRegNo,
      totalTourDays,
      noOfTickets,
      ticketPrice,
      specialNote,
      startTime,
      endTime,
      image1: image1Url?.secure_url || null,
      image2: image2Url?.secure_url || null,
      image3: image3Url?.secure_url || null,
    });

    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Error creating tour", error: err.message });
  }
};


const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  // console.log("tour",tour);
  res.json(tour);
};

const updateTour = async (req, res) => {
  try {
    // console.log("hello", req.body);
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // console.log("hello", updatedTour);
    res.json(updatedTour);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

const updateTourImages = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Only update provided images
    if (files.image1 && files.image1[0]) {
      const uploaded = await uploadImageCloudinary(files.image1[0]);
      tour.image1 = uploaded.secure_url;
    }

    if (files.image2 && files.image2[0]) {
      const uploaded = await uploadImageCloudinary(files.image2[0]);
      tour.image2 = uploaded.secure_url;
    }

    if (files.image3 && files.image3[0]) {
      const uploaded = await uploadImageCloudinary(files.image3[0]);
      tour.image3 = uploaded.secure_url;
    }

    const updatedTour = await tour.save();
    res.status(200).json({
      message: "Images updated successfully",
      tour: updatedTour,
    });
  } catch (err) {
    console.error("Error updating images:", err);
    res.status(500).json({ message: "Failed to update images", error: err.message });
  }
};


module.exports = {
  createTour,
  getAllTours,
  deleteTour,
  getTour,
  updateTour,
  updateTourImages,
};
