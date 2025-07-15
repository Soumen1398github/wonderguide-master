import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const UpdateLodge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lodgeType, setLodgeType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedLodges = JSON.parse(localStorage.getItem("lodges")) || [];
    const lodge = storedLodges.find((l) => l.id === parseInt(id));

    if (lodge) {
      setLodgeType(lodge.lodgeType);
      setDescription(lodge.description);
    } else {
      alert("Lodge not found!");
      navigate("/view-lodge");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lodgeType || !description) {
      alert("Please fill all fields!");
      return;
    }

    const storedLodges = JSON.parse(localStorage.getItem("lodges")) || [];
    const updatedLodges = storedLodges.map((l) =>
      l.id === parseInt(id) ? { ...l, lodgeType, description } : l
    );

    localStorage.setItem("lodges", JSON.stringify(updatedLodges));
    alert("Lodge updated successfully!");
    navigate("/view-lodge");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        Update Lodge
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lodge Type</label>
          <input
            type="text"
            value={lodgeType}
            onChange={(e) => setLodgeType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Back
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Lodge
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateLodge;
