const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const tourRoute = require("./routes/tourRoute");
const bookRoute = require("./routes/bookRoute");
const activityRoutes = require("./routes/activityRoute");
const mealRoutes = require("./routes/mealRoute");
const { default: transcriberModal } = require("./modal/transcriberModal");
const tourModal = require("./modal/tourModal");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/tour", tourRoute);
app.use("/api/book", bookRoute);
app.use("/api/tours", activityRoutes);
app.use("/api/meal", mealRoutes);


app.post("/save-transcript", async (req, res) => {
  try {
    const { userId, name, phone, transcript, language, prompt, callId, tourId } = req.body;

    console.log(req.body)
    if (!userId || !transcript || !callId || !tourId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTranscript = new transcriberModal({
      userId,
      name,
      phone,
      transcript,
      prompt,
      language,
      callId,
      tourId,  // Save the associated tourId
    });

    await newTranscript.save();
    res.status(201).json({ message: "Transcript saved", data: newTranscript });
  } catch (err) {
    console.error("Error saving transcript:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/get-user-transcripts", async (req, res) => {
  try {
    const { userId } = req.body;

    // Step 1: Find all tours created by the user
    const userTours = await tourModal.find({ user: userId }).lean();

    if (userTours.length === 0) {
      return res.json([]); // No tours → no transcripts
    }

    // Step 2: Extract tour IDs
    const tourIds = userTours.map(tour => tour._id);

    // Step 3: Find all transcripts related to those tours
    const transcripts = await transcriberModal.find({ tourId: { $in: tourIds } }).lean();

    // Step 4: Map transcripts with their respective tour and include guideId
    const result = transcripts.map(t => {
      const matchingTour = userTours.find(tour => tour._id.toString() === t.tourId.toString());
      return {
        ...t,
        tour: matchingTour,
        guideId: matchingTour?.user || null  // Assuming `user` field in tour is the guide
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching transcripts:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







