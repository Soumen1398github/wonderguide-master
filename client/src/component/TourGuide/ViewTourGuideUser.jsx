import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavbarTourGuide from "../NavbarTourGuide";
import axios from "axios";
import NavbarUser from "../NavbarUser";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ViewTourGuideUser = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const [totalTickets, setTotalTickets] = useState();

  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/tour/tours/${id}`
        );
        setTour(res.data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };

    fetchTour();
  }, [id]);

  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+917384289687");
  const [prompt, setPrompt] = useState(
    "You are a friendly and professional tour assistant. Ask the user three important questions to understand their needs: First, ask how many days they want the tour to be. Then, ask which location they are interested in visiting. Finally, ask what price range or budget they have in mind. Be polite, clear, and helpful throughout the conversation."
  );

  const [language, setLanguage] = useState("en");
  const formatPhoneNumber = (input) => {
    const trimmed = input.trim();
    const regex = /^\+\d{10,15}$/; // E.164 format
    return regex.test(trimmed) ? trimmed : null;
  };

  const handleDemoCall = async (e) => {
    e.preventDefault();

    if (!language) {
      Swal.fire({
        icon: "error",
        text: "Please select a language first",
      });
      return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!formattedPhone) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number with country code (e.g., +1 for US)",
      });
      return;
    }

    try {
      const response = await fetch("https://api.vapi.ai/call", {
        method: "POST",
        headers: {
          Authorization: "Bearer cce0f9d7-79b3-4da4-888e-896c6b9ac8a4", // Replace with secure token management
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Call with ${firstName}`,
          phoneNumberId: "864c727e-f775-44fb-85c0-c2e596ce1dee", // Replace with your actual phoneNumberId
          customer: {
            number: formattedPhone,
          },
          assistant: {
            transcriber: {
              provider: "deepgram",
              model: "nova-2",
              language: language,
              smartFormat: false,
            },
            model: {
              provider: "openai",
              model: "gpt-4",
              messages: [
                {
                  role: "system",
                  content: prompt,
                },
              ],
              knowledgeBase: {
                provider: "canonical",
                fileIds: ["your-file-id"], // Replace with your file ID if needed
              },
            },
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const callId = data.id; // Vapi call ID

        // Start polling for call result and save transcript after completion
        pollCallResultAndSave(callId, firstName, formattedPhone);
      } else {
        console.error("Call failed:", data);
        Swal.fire({
          icon: "error",
          title: "Call Failed",
          text: data.message || "Something went wrong. Try again later.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while trying to make the call.",
      });
    }
  };

  const pollCallResultAndSave = async (callId, name, phone) => {
    const userId = localStorage.getItem("id");
    const tourId = id; // Assuming you want to save the tour ID as well
    const pollingInterval = 30000; // 5 seconds
    const maxRetries = 20; // Set a maximum number of retries

    ////////////

    const poll = async (retries = 0) => {
      try {
        const res = await fetch(`https://api.vapi.ai/call/${callId}`, {
          headers: {
            Authorization: "Bearer cce0f9d7-79b3-4da4-888e-896c6b9ac8a4",
          },
        });
        const result = await res.json();

        // Check the status of the call
        if (result.status === "ended") {
          // If the call has ended, send SMS and schedule the appointment

          console.log(result.transcript);

          const fullTranscript = result.transcript;
          await fetch(`${import.meta.env.VITE_SERVER}/save-transcript`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              name: "Sayak",
              phone,
              tourId,
              transcript: fullTranscript,
              language,
              prompt,
              callId,
            }),
          });
          console.log("Transcript saved to DB");

          // Stop polling as the transcript has been saved and call ended
          return;
        } else if (retries < maxRetries) {
          console.log("Call not ended yet, retrying...");
          setTimeout(() => poll(retries + 1), pollingInterval); // Keep polling with retries
        } else {
          console.log(`Call ${callId} did not complete in time.`);
        }
      } catch (err) {
        console.error("Polling error:", err);
        // Optionally retry on failure
        if (retries < maxRetries) {
          setTimeout(() => poll(retries + 1), pollingInterval); // Retry polling on error
        } else {
          console.error("Max retries reached. Call did not complete.");
        }
      }
    };

    poll(); // Start the polling process
  };

  const handleBookNow = () => {
    navigate(`/tour/${id}/add-members`, {
      state: { totalTickets }, // Pass totalTickets in state
    });
  };

  if (!tour)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {role === "user" ? (
        <NavbarUser />
      ) : role === "guide" ? (
        <NavbarTourGuide />
      ) : (
        <NavbarUser />
      )}

      <div className="max-w-5xl mx-auto mt-4 p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          {tour.tourName}
        </h2>
        <p className="text-gray-600 mb-4">{tour.tourDescription}</p>

        {/* Images */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[tour.image1, tour.image2, tour.image3].map(
            (img, i) =>
              img && (
                <img
                  key={i}
                  src={img}
                  alt={`Image ${i + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
              )
          )}
        </div>

        {/* Locations & Dates */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>From:</strong> {tour.fromLocation}
          </p>
          <p>
            <strong>To:</strong> {tour.toLocation}
          </p>
          <p>
            <strong>Total Tour Days:</strong> {tour.totalTourDays}
          </p>
          <p>
            <strong>No. of Tickets:</strong> {tour.noOfTickets}
          </p>
          <p>
            <strong>Ticket Price:</strong> ₹ {tour.ticketPrice}
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {new Date(tour.startTime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong> {new Date(tour.endTime).toLocaleString()}
          </p>
          <p>
            <strong>Special Note:</strong> {tour.specialNote || "N/A"}
          </p>
        </div>

        {/* Lodge Info */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Lodging Details
          </h3>
          <p>
            <strong>Lodge Name:</strong> {tour.lodgeName}
          </p>
          <p>
            <strong>Lodge Type:</strong> {tour.lodgeType}
          </p>
          <p>
            <strong>Lodge Address:</strong> {tour.lodgeAddress}
          </p>
        </div>

        {/* Transport Info */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Transport Details
          </h3>
          <p>
            <strong>Type:</strong> {tour.transportType}
          </p>
          <p>
            <strong>Description:</strong> {tour.transportDescription}
          </p>
          <p>
            <strong>Reg No:</strong> {tour.transportRegNo}
          </p>
        </div>

        {/* Booking CTA */}
        <div className="mt-10 p-6 bg-blue-50 rounded-2xl shadow-md max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-blue-800 mb-5 text-center">
            Choose Total Tickets
          </h3>

          <input
            type="number"
            min={1}
            max={tour.noOfTickets}
            value={totalTickets}
            onChange={(e) => {
              const selected = Number(e.target.value);
              if (selected >= 1 && selected <= tour.noOfTickets) {
                setTotalTickets(selected);
              }
            }}
            className="w-full mb-6 p-3 border border-blue-300 rounded-lg text-center text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder={`Max: ${tour.noOfTickets}`}
          />

          <button
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg w-full transition duration-200 shadow-sm hover:shadow-lg"
          >
            Book Now
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-700">
            Want to join this tour?
          </h3>
          <button
            onClick={handleDemoCall}
            className="mt-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Request a Demo Call ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTourGuideUser;
