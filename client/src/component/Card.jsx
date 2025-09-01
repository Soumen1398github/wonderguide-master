// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function ResponsiveCard() {
//   const [tours, setTours] = useState([]);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_SERVER}/api/tour/tours`
//         );
//         setTours(response.data);
//       } catch (error) {
//         console.error("Error fetching tours:", error);
//       }
//     };

//     fetchTours();
//   }, []);

//   return (
//     <div className="relative pt-5 p-2">
//       <div className="flex flex-col gap-5 container mx-auto">
//         {tours.length > 0 &&
//           tours.map((tour, index) => {
//             const start = new Date(tour.startTime);
//             const end = new Date(tour.endTime);
//             const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//             const isEven = index % 2 === 0;

//             return (
//               <Link key={tour._id} to={`/view-tour-details-user/${tour._id}`}>
//                 <div
//                   className={`flex flex-col md:flex-row ${
//                     !isEven && "md:flex-row-reverse"
//                   } gap-4 border border-blue-100 rounded-2xl my-4 p-4 bg-white hover:shadow-md transition duration-300 ease-in-out dark:bg-gray-900`}
//                 >
//                   {/* Images Section */}
//                   <div className="w-full md:w-1/3 flex flex-col gap-2">
//                     <img
//                       src={tour.image1}
//                       alt="Main Tour"
//                       className="h-48 w-full object-cover rounded-lg"
//                     />
//                     <div className="flex gap-2">
//                       <img
//                         src={tour.image2}
//                         alt="Tour 2"
//                         className="h-24 w-1/2 object-cover rounded-lg"
//                       />
//                       <img
//                         src={tour.image3}
//                         alt="Tour 3"
//                         className="h-24 w-1/2 object-cover rounded-lg"
//                       />
//                     </div>
//                   </div>

//                   {/* Details Section */}
//                   <div className="flex flex-col justify-between w-full md:w-2/3 px-2">
//                     <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
//                       {tour.tourName}
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-300 mb-4">
//                       {tour.tourDescription}
//                     </p>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
//                       <div>
//                         <strong>From:</strong> {tour.fromLocation}
//                       </div>
//                       <div>
//                         <strong>To:</strong> {tour.toLocation}
//                       </div>
//                       <div>
//                         <strong>Start Time:</strong> {start.toLocaleString()}
//                       </div>
//                       <div>
//                         <strong>End Time:</strong> {end.toLocaleString()}
//                       </div>
//                       <div>
//                         <strong>Total Days:</strong> {totalDays} day(s)
//                       </div>
//                       <div>
//                         <strong>Tickets:</strong> {tour.noOfTickets}
//                       </div>
//                       <div>
//                         <strong>Price:</strong> ₹{tour.ticketPrice}
//                       </div>
//                       {tour.specialNote && (
//                         <div className="col-span-2">
//                           <strong>Special Note:</strong> {tour.specialNote}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// export default ResponsiveCard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ResponsiveCard() {
  const [tours, setTours] = useState([]);
  //const [searchName, setSearchName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  // Fetch all tours initially
  useEffect(() => {
    fetchTours();
  }, []);

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

  // Search Handler
  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();

      if (searchQuery) params.append("name", searchQuery); // 👈 must match backend
      if (fromLocation) params.append("from", fromLocation);
      if (toLocation) params.append("to", toLocation);

      const response = await axios.get(
        `http://localhost:5000/api/tour/search?${params.toString()}`
      );

      setTours(response.data);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <div className="relative pt-5 p-2">
      {/* 🔹 Search Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // stop page refresh
          handleSearch();
        }}
        className="flex flex-col md:flex-row gap-2 justify-center items-center mb-6"
      >
        <input
          type="text"
          placeholder="Search by tour name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3"
        />

        <select
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/4"
        >
          <option value="">From Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <select
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/4"
        >
          <option value="">To Location</option>
          <option value="Manali">Manali</option>
          <option value="Darjeeling">Darjeeling</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Assam">Assam</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>

        <button
          type="button"
          onClick={fetchTours}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </form>

      {/* 🔹 Tour Cards */}
      <div className="flex flex-col gap-5 container mx-auto">
        {tours.length > 0 ? (
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
                  {/* Images */}
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

                  {/* Details */}
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
          })
        ) : (
          <p className="text-center text-gray-500">No tours found</p>
        )}
      </div>
    </div>
  );
}

export default ResponsiveCard;
