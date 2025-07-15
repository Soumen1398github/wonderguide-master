import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTourGuide from "../NavbarTourGuide";
import NavbarUser from "../NavbarUser";

const AddLocation = () => {
  const [locationName, setLocationName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  // Load existing locations from local storage
  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    setLocations(storedLocations);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationName || !category || !description) {
      alert("Please fill all fields!");
      return;
    }

    // Generate new ID (Incrementing)
    const newId =
      locations.length > 0 ? locations[locations.length - 1].id + 1 : 1;
    const newLocation = {
      id: newId,
      locationName,
      category,
      description,
    };

    // Update local storage and state
    const updatedLocations = [...locations, newLocation];
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
    setLocations(updatedLocations);

    alert("Location added successfully!");
    navigate("/view-location"); // Redirect to View Locations
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
          Add New Location
        </div>
        <form onSubmit={handleSubmit}>
          {/* Location Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location Name
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select Category</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountain</option>
              <option value="city">City</option>
              <option value="historical">Historical</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter a short description..."
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800"
            >
              Add Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocation;
