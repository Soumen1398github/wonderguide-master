import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ResponsiveCard() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/tour/tours`
        );
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="relative pt-5 p-2">
      <div className="flex flex-col gap-5 container mx-auto">
        {tours.length > 0 &&
          tours.map((tour, index) => {
            const start = new Date(tour.startTime);
            const end = new Date(tour.endTime);
            const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            const isEven = index % 2 === 0;

            return (
              <Link key={tour._id} to={`/view-tour-details-user/${tour._id}`}>
                <div
                  className={`flex flex-col md:flex-row ${
                    !isEven && "md:flex-row-reverse"
                  } gap-4 border border-blue-100 rounded-2xl my-4 p-4 bg-white hover:shadow-md transition duration-300 ease-in-out dark:bg-gray-900`}
                >
                  {/* Images Section */}
                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <img
                      src={tour.image1}
                      alt="Main Tour"
                      className="h-48 w-full object-cover rounded-lg"
                    />
                    <div className="flex gap-2">
                      <img
                        src={tour.image2}
                        alt="Tour 2"
                        className="h-24 w-1/2 object-cover rounded-lg"
                      />
                      <img
                        src={tour.image3}
                        alt="Tour 3"
                        className="h-24 w-1/2 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col justify-between w-full md:w-2/3 px-2">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      {tour.tourName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tour.tourDescription}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <strong>From:</strong> {tour.fromLocation}
                      </div>
                      <div>
                        <strong>To:</strong> {tour.toLocation}
                      </div>
                      <div>
                        <strong>Start Time:</strong> {start.toLocaleString()}
                      </div>
                      <div>
                        <strong>End Time:</strong> {end.toLocaleString()}
                      </div>
                      <div>
                        <strong>Total Days:</strong> {totalDays} day(s)
                      </div>
                      <div>
                        <strong>Tickets:</strong> {tour.noOfTickets}
                      </div>
                      <div>
                        <strong>Price:</strong> ₹{tour.ticketPrice}
                      </div>
                      {tour.specialNote && (
                        <div className="col-span-2">
                          <strong>Special Note:</strong> {tour.specialNote}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default ResponsiveCard;
