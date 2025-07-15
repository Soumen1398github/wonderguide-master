import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const AddTransport = () => {
  const [transportName, setTransportName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transportName || !description) {
      alert("Please fill all fields!");
      return;
    }

    // Get existing transports from localStorage or set an empty array
    const transports = JSON.parse(localStorage.getItem("transports")) || [];
    const newTransport = {
      id: transports.length + 1, // Auto-incrementing ID
      transportName,
      description,
    };

    transports.push(newTransport);
    localStorage.setItem("transports", JSON.stringify(transports));

    alert("Transport added successfully!");
    navigate("/view-transport");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        Add Transport
      </div>
      <form onSubmit={handleSubmit}>
        {/* Transport Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Transport Name</label>
          <input
            type="text"
            value={transportName}
            onChange={(e) => setTransportName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter a description of the transport..."
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Back
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Transport
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddTransport;
