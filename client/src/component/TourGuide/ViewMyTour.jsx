import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTourGuide from "../NavbarTourGuide";
import axios from "axios";

const ViewMyTour = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/tour/tours`);
      response.data = response.data.filter((tour) => tour.user === localStorage.getItem("id"));
      // console.log(response.data);
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/tour/tours/${id}`);
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };
  console.log(localStorage.getItem("role"))

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <NavbarTourGuide />
      </div>

      <div className="flex-grow overflow-auto bg-gray-100 p-4">
        <div className="w-full min-w-[1200px] bg-white shadow-lg rounded-xl p-6">
          <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl px-5 py-2.5 mb-4">
            All Tours Added
          </div>

          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full border-collapse border border-gray-300 text-sm text-center">
              <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                <tr>
                  {/* <th>ID</th> */}
                  <th>Name</th>
                  <th>Description</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Lodge Type</th>
                  <th>Lodge Name</th>
                  <th>Lodge Address</th>
                  <th>Transport Type</th>
                  <th>Transport Reg</th>
                  <th>Transport Desc</th>
                  <th>Total Days</th>
                  <th>Tickets</th>
                  <th>Price</th>
                  <th>Note</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Image 1</th>
                  <th>Image 2</th>
                  <th>Image 3</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.length > 0 ? (
                  tours.map((tour) => (
                    <tr key={tour._id} className="bg-white hover:bg-gray-50">
                      {/* <td>{tour._id}</td> */}
                      <td>{tour.tourName}</td>
                      <td>{tour.tourDescription}</td>
                      <td>{tour.fromLocation}</td>
                      <td>{tour.toLocation}</td>
                      <td>{tour.lodgeType}</td>
                      <td>{tour.lodgeName}</td>
                      <td>{tour.lodgeAddress}</td>
                      <td>{tour.transportType}</td>
                      <td>{tour.transportRegNo}</td>
                      <td>{tour.transportDescription}</td>
                      <td>{tour.totalTourDays}</td>
                      <td>{tour.noOfTickets}</td>
                      <td>${tour.ticketPrice}</td>
                      <td>{tour.specialNote}</td>
                      <td>{new Date(tour.startTime).toLocaleString()}</td>
                      <td>{new Date(tour.endTime).toLocaleString()}</td>
                      <td>
                        {tour.image1 && (
                          <img src={tour.image1} alt="Image 1" className="w-12 h-12 object-cover mx-auto rounded" />
                        )}
                      </td>
                      <td>
                        {tour.image2 && (
                          <img src={tour.image2} alt="Image 2" className="w-12 h-12 object-cover mx-auto rounded" />
                        )}
                      </td>
                      <td>
                        {tour.image3 && (
                          <img src={tour.image3} alt="Image 3" className="w-12 h-12 object-cover mx-auto rounded" />
                        )}
                      </td>
                      <td className="space-x-1">
                        <button
                          onClick={() => navigate(`/view-tour-details/${tour._id}`)}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(tour._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="21" className="text-center py-4 text-gray-500">
                      No tours added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyTour;
