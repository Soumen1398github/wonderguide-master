import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    name: String,
    phone: String,
    language: String,
    transcript: String,
    callId: {
      type: String,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tour", // Reference to the Tour model
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transcript", transcriptSchema);
