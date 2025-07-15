import React, { useEffect, useState } from "react";
import NavbarTourGuide from "../NavbarTourGuide";
import axios from "axios";

function MyTourBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/book/bookings/user/${userId}`
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarTourGuide />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
          My Tour Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading bookings...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white text-sm sm:text-base">
                <tr>
                  <th className="px-2 py-3 sm:px-3 text-center">Tour Name</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Customer Name</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Email</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Contact No.</th>
                  <th className="px-2 py-3 sm:px-3 text-center">From</th>
                  <th className="px-2 py-3 sm:px-3 text-center">To</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Tickets</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Total Price</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Booking Time</th>
                  <th className="px-2 py-3 sm:px-3 text-center">Members</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm sm:text-base">
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-4 py-6 text-center text-gray-500 text-lg"
                    >
                      😕 No tours are booked yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.tour.tourName}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.user.firstName} {booking.user.lastName}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.user.email}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.user.contactNo}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.tour.fromLocation}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.tour.toLocation}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.numberOfTickets}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center font-semibold">
                        ${booking.totalPrice}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {new Date(booking.bookedAt).toLocaleString()}
                      </td>
                      <td className="px-2 py-2 sm:px-3 text-center">
                        {booking.members && booking.members.length > 0 ? (
                          <ul className="list-disc list-inside text-left space-y-1">
                            {booking.members.map((member, index) => (
                              <li key={index}>
                                {member.name} {member.age && `(${member.age})`}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400">No members</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTourBookings;
