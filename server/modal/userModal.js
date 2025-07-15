const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { type: String, required: true },
  streetCity: { type: String, required: true },
  pincode: { type: String, required: true },
  profilePhoto: { type: String, default: "" },
  role: { 
    type: String, 
    enum: ["admin", "guide", "user"], 
    default: "user" 
  }
});

module.exports = mongoose.model("User", userSchema);
