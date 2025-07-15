import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const ViewLocation = () => {
  const navigate = useNavigate();
  const defaultLocations = [
    { id: 1, locationName: "Goa Beach", category: "Beach", description: "Beautiful sunny beach with golden sand." },
    { id: 2, locationName: "Manali Hills", category: "Mountain", description: "Snow-capped mountains and adventure sports." },
    { id: 3, locationName: "Taj Mahal", category: "Historical", description: "One of the seven wonders of the world." },
    { id: 4, locationName: "New York City", category: "City", description: "The city that never sleeps, with amazing skyscrapers." },
  ];

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Check if locations exist in localStorage, otherwise set default locations
    const storedLocations = JSON.parse(localStorage.getItem("locations"));
    if (storedLocations && storedLocations.length > 0) {
      setLocations(storedLocations);
    } else {
      setLocations(defaultLocations);
      localStorage.setItem("locations", JSON.stringify(defaultLocations));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedLocations = locations.filter((location) => location.id !== id);
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
    setLocations(updatedLocations);
    alert("Location deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <NavbarUser/>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        View Locations
      </div>

      {locations.length === 0 ? (
        <p className="text-center text-gray-600">No locations available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Location Name</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id} className="border hover:bg-gray-100">
                <td className="border p-3">{location.id}</td>
                <td className="border p-3">{location.locationName}</td>
                <td className="border p-3">{location.category}</td>
                <td className="border p-3">{location.description}</td>
                <td className="border p-3 text-center flex justify-center space-x-3">
                  <button
                    onClick={() => navigate(`/update-location/${location.id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default ViewLocation;
