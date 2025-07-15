const mongoose = require("mongoose");
const Booking = require("../modal/bookModal");
const Tour = require("../modal/tourModal"); // Assuming you have a Tour model
const sendEmail = require("../utils/sendEmail"); // Assuming you have a sendEmail utility
const User = require("../modal/userModal"); // Assuming you have a User model

// Booking a tour
const bookTour = async (req, res) => {
  try {
    const { tourId, userId, numberOfTickets } = req.body; // Assume tourId and userId come from the request body

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if the tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Check if there are enough tickets available
    if (tour.noOfTickets < numberOfTickets) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    // Create the booking
    const totalPrice = numberOfTickets * tour.ticketPrice;
    const newBooking = new Booking({
      tour: tourId,
      user: new mongoose.Types.ObjectId(userId), // Use `new` to instantiate ObjectId
      numberOfTickets,
      totalPrice,
      members: req.body.members || [], // Optional: if you want to save members' details
    });

    // Save the booking
    await newBooking.save();

    // Update the tour's available tickets
    tour.noOfTickets -= numberOfTickets;
    await tour.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error("Error booking tour:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const bookings = await Booking.find({ user: userId }).populate("tour").exec();

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Step 1: Get all tours created by this user
    const tours = await Tour.find({ user: userId });

    // Step 2: Extract tour IDs
    const tourIds = tours.map((tour) => tour._id);

    // Step 3: Find bookings where the tour is in that list
    const bookings = await Booking.find({ tour: { $in: tourIds } })
      .populate("user", "firstName lastName email contactNo") // who booked
      .populate("tour"); // the tour details

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings for guide:", error);
    res.status(500).json({ message: "Failed to fetch bookings for guide" });
  }
};
const stripe = require("stripe")(process.env.STRIPE); // Replace with your Stripe secret key

const payment = async (req, res) => {
  const { tourId, userId, numberOfTickets, members } = req.body;

  try {
    const tour = await Tour.findById(new mongoose.Types.ObjectId(tourId));
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const priceEach = parseInt(tour.ticketPrice);
    const totalPrice = priceEach * numberOfTickets;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: tour.tourName,
              description: tour.tourDescription,
            },
            unit_amount: priceEach * 100, // In paise
          },
          quantity: numberOfTickets,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_CANCEL_URL}`,
      metadata: {
        tourId: tour._id.toString(),
        userId: userId.toString(),
        numberOfTickets: numberOfTickets.toString(),
        totalPrice: totalPrice.toString(),
        members: JSON.stringify(members),
      },
    });

    res.send({ id: session.id });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};


const verifyPaymentSession = async (req, res) => {
  const { sessionId } = req.body;
  // console.log("Hello", req.body);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const { tourId, userId, numberOfTickets, totalPrice, members } = session.metadata;

    const parsedTourId = String(tourId); // this should be a 24-character hex string
    const parsedUserId = String(userId);
    const parsedNumberOfTickets = parseInt(numberOfTickets, 10);
    const parsedTotalPrice = parseFloat(totalPrice);
    const parsedMembers = members ? JSON.parse(members) : [];

    const tour = await Tour.findById(new mongoose.Types.ObjectId(parsedTourId))
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    if (tour.noOfTickets < parsedNumberOfTickets) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    const newBooking = new Booking({
      tour: parsedTourId,
      user: parsedUserId,
      numberOfTickets: parsedNumberOfTickets,
      totalPrice: parsedTotalPrice,
      members: parsedMembers,
    });

    await newBooking.save();

    console.log(newBooking)

    tour.noOfTickets -= parsedNumberOfTickets;
    await tour.save();

    const user = await User.findById(parsedUserId);
    if (user && user.email) {
      try {
        await sendEmail(
          user.email,
          "🎉 Booking Confirmation - WonderGuide",
          `
            <h2>Hello ${user.firstName || "Traveler"}!</h2>
            <p>Thank you for booking <strong>${tour.tourName}</strong>.</p>
            <p><strong>Tickets Booked:</strong> ${parsedNumberOfTickets}</p>
            <p><strong>Total Paid:</strong> ₹${parsedTotalPrice}</p>
            <p>We hope you have a great experience!</p>
            <br/>
            <small>This is an automated confirmation. Do not reply to this email.</small>
          `
        );
        console.log("Booking confirmation email sent to:", user.email);
      } catch (emailErr) {
        console.error("Failed to send email:", emailErr);
      }
    }

    res.status(200).json({
      message: "Booking successful",
      booking: newBooking,
      tourName: tour.tourName,
      numberOfTickets: parsedNumberOfTickets,
      totalPrice: parsedTotalPrice,
      members: parsedMembers,
    });
  } catch (err) {
    console.error("Error verifying payment session:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Add route to your routes file


module.exports = { bookTour, getUserBookings, getBookingsByUser,payment,verifyPaymentSession };
