// controllers/userController.js
const User = require("../modal/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNo, streetCity, pincode } = req.body;
    const profilePhoto = req.file ? req.file.filename : "";

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNo,
      streetCity,
      pincode,
      profilePhoto,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

  
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ message: "User Doesn't Exist" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });
  
      const token = jwt.sign(
        { id: user._id, role: user.role ,},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ 
        token, 
        role: user.role, 
        id: user._id,
        profilePhoto: user.profilePhoto,
        firstName: user.firstName,
        lastName: user.lastName
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  