import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarTourGuide from "../NavbarTourGuide";
import axios from "axios";

const ViewButtonTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/tour/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };

    fetchTour();
  }, [id]);

  if (!tour) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarTourGuide />

      <div className="max-w-5xl mx-auto mt-4 p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">{tour.tourName}</h2>
        <p className="text-gray-600 mb-4">{tour.tourDescription}</p>

        {/* Images */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[tour.image1, tour.image2, tour.image3].map((img, i) => (
            img && <img key={i} src={img} alt={`Image ${i + 1}`} className="w-full h-32 object-cover rounded-lg shadow" />
          ))}
        </div>

        {/* Locations & Dates */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>From:</strong> {tour.fromLocation}</p>
          <p><strong>To:</strong> {tour.toLocation}</p>
          <p><strong>Total Tour Days:</strong> {tour.totalTourDays}</p>
          <p><strong>No. of Tickets:</strong> {tour.noOfTickets}</p>
          <p><strong>Ticket Price:</strong> ₹ {tour.ticketPrice}</p>
          <p><strong>Start Time:</strong> {new Date(tour.startTime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(tour.endTime).toLocaleString()}</p>
          <p><strong>Special Note:</strong> {tour.specialNote || "N/A"}</p>
        </div>

        {/* Lodge Info */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Lodging Details</h3>
          <p><strong>Lodge Name:</strong> {tour.lodgeName}</p>
          <p><strong>Lodge Type:</strong> {tour.lodgeType}</p>
          <p><strong>Lodge Address:</strong> {tour.lodgeAddress}</p>
        </div>

        {/* Transport Info */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Transport Details</h3>
          <p><strong>Type:</strong> {tour.transportType}</p>
          <p><strong>Description:</strong> {tour.transportDescription}</p>
          <p><strong>Reg No:</strong> {tour.transportRegNo}</p>
        </div>

        {/* Booking CTA */}
        {/* <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-700">Want to join this tour?</h3>
          <button className="mt-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
            Book Tour
          </button>
        </div> */}

        {/* Manage Buttons */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Manage Tour</h3>
          <div className="flex flex-wrap gap-4">
            <Link to={`/update-tour-details/${tour._id}`}>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Update Details</button>
            </Link>
            <Link to={`/update-tour-images/${tour._id}`}>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Update Images</button>
            </Link>
            <Link to={`/add-activity/${tour._id}`}>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Add Activity</button>
            </Link>
            <Link to={`/update-meals/${tour._id}`}>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Add Meals</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewButtonTour;
