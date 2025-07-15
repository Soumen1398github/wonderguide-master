import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const UpdateLocation = () => {
  const { id } = useParams(); // Get the location ID from the URL
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch location details from localStorage
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    const location = storedLocations.find((loc) => loc.id === parseInt(id));

    if (location) {
      setLocationName(location.locationName);
      setCategory(location.category);
      setDescription(location.description);
    } else {
      alert("Location not found!");
      navigate("/view-location");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationName || !category || !description) {
      alert("Please fill all fields!");
      return;
    }

    // Update location data in localStorage
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    const updatedLocations = storedLocations.map((loc) =>
      loc.id === parseInt(id) ? { ...loc, locationName, category, description } : loc
    );

    localStorage.setItem("locations", JSON.stringify(updatedLocations));
    alert("Location updated successfully!");
    navigate("/view-location");
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <NavbarUser/>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        Update Location
      </div>
      <form onSubmit={handleSubmit}>
        {/* Location Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter a short description of the location..."
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>

          {/* Update Button */}
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Location
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateLocation;
