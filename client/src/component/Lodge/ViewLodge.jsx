import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const ViewLodge = () => {
  const [lodges, setLodges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLodges = JSON.parse(localStorage.getItem("lodges")) || [];
    setLodges(storedLodges);
  }, []);

  const handleDelete = (id) => {
    const updatedLodges = lodges.filter((lodge) => lodge.id !== id);
    localStorage.setItem("lodges", JSON.stringify(updatedLodges));
    setLodges(updatedLodges);
    alert("Lodge deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
          All Tour Lodges
        </div>

        {lodges.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-4">
             No lodges available.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Lodge Id</th>
                <th className="border border-gray-300 px-4 py-2">Lodge Type</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lodges.map((lodge) => (
                <tr key={lodge.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{lodge.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{lodge.lodgeType}</td>
                  <td className="border border-gray-300 px-4 py-2">{lodge.description}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/update-lodge/${lodge.id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(lodge.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

export default ViewLodge;
