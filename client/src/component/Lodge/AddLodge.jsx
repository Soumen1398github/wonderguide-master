import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const AddLodge = () => {
  const [lodgeType, setLodgeType] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lodgeType || !description) {
      alert("Please fill all fields!");
      return;
    }

    const storedLodges = JSON.parse(localStorage.getItem("lodges")) || [];
    const newLodge = {
      id: storedLodges.length + 1, // Auto-increment ID
      lodgeType,
      description,
    };

    storedLodges.push(newLodge);
    localStorage.setItem("lodges", JSON.stringify(storedLodges));

    alert("Lodge added successfully!");
    navigate("/view-lodge");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        Add Lodge
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lodge Type</label>
          <select
            value={lodgeType}
            onChange={(e) => setLodgeType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Lodge Type</option>
            <option value="villa">Villa</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="bunglow">Bunglow</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter lodge details..."
            required
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Back
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Lodge
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddLodge;
