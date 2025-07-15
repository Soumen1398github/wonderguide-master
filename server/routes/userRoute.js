// routes/userRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { upload } = require("../middlware/userImageMiddleware");
const router = express.Router();

router.post("/register", upload.single("profilePhoto"), registerUser);
router.post("/login", loginUser);

module.exports = router;