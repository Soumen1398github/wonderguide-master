// routes/bookingRoutes.js
const express = require("express");
const { bookTour,getUserBookings,getBookingsByUser,payment ,verifyPaymentSession} = require("../controllers/bookController");
const router = express.Router();

// Route to handle tour booking
router.post("/book", bookTour);
router.get("/bookings/:userId", getUserBookings);
router.get("/bookings/user/:userId", getBookingsByUser);
router.post("/create-checkout-session", payment);
router.post("/payment/verify", verifyPaymentSession);

module.exports = router;
