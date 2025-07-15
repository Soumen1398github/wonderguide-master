import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const ViewTourGuide = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGuides = JSON.parse(localStorage.getItem("tourGuides")) || [];
    setGuides(storedGuides);
  }, []);

  const handleDelete = (id) => {
    const updatedGuides = guides.filter((guide) => guide.id !== id);
    localStorage.setItem("tourGuides", JSON.stringify(updatedGuides));
    setGuides(updatedGuides);
    alert("Tour Guide deleted successfully!");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar Section */}
      <div className="flex-shrink-0">
        <NavbarUser />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center bg-gray-100 p-4">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
          <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-4">
            All Tour Guides
          </div>

          {/* Responsive Scrollable Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-center">
                  <th className="border border-gray-300 px-3 py-2">ID</th>
                  <th className="border border-gray-300 px-3 py-2">Name</th>
                  <th className="border border-gray-300 px-3 py-2">City</th>
                  <th className="border border-gray-300 px-3 py-2">PIN</th>
                  <th className="border border-gray-300 px-3 py-2">Mobile</th>
                  <th className="border border-gray-300 px-3 py-2">Email</th>
                  <th className="border border-gray-300 px-3 py-2">Experience</th>
                  <th className="border border-gray-300 px-3 py-2">Language</th>
                  <th className="border border-gray-300 px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guides.length > 0 ? (
                  guides.map((guide) => (
                    <tr key={guide.id} className="text-center bg-white hover:bg-gray-100">
                      <td className="border border-gray-300 px-3 py-2">{guide.id}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.name}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.city}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.pin}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.mobile}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.email}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.experience}</td>
                      <td className="border border-gray-300 px-3 py-2">{guide.language}</td>
                      <td className="border border-gray-300 px-3 py-2 space-x-2">
                        <button
                          onClick={() => navigate(`/update-tour-guide/${guide.id}`)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(guide.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No tour guides found.
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

export default ViewTourGuide;
