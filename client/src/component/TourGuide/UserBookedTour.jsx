import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUser from "../NavbarUser";

const UserBookedTour = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id"); // You should dynamically fetch this, e.g., from authentication

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/book/bookings/${userId}`);
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <NavbarUser />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Your Booked Tours</h2>

      {bookings.length > 0 ? (
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Tour Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Number of Tickets</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Total Price</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Booking Date</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Start Time</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-800">{booking.tour.tourName}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{booking.numberOfTickets}</td>
                <td className="py-3 px-6 text-sm text-gray-800">₹ {booking.totalPrice}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{new Date(booking.bookedAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{new Date(booking.tour.startTime).toLocaleString()}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{new Date(booking.tour.endTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No bookings found.</p>
      )}
    </div>
    </>
  );
};

export default UserBookedTour;
