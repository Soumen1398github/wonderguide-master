import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const UpdateTransport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transportName, setTransportName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedTransports = JSON.parse(localStorage.getItem("transports")) || [];
    const transport = storedTransports.find((t) => t.id === parseInt(id));

    if (transport) {
      setTransportName(transport.transportName);
      setDescription(transport.description);
    } else {
      alert("Transport not found!");
      navigate("/view-transport");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transportName || !description) {
      alert("Please fill all fields!");
      return;
    }

    const storedTransports = JSON.parse(localStorage.getItem("transports")) || [];
    const updatedTransports = storedTransports.map((t) =>
      t.id === parseInt(id) ? { ...t, transportName, description } : t
    );

    localStorage.setItem("transports", JSON.stringify(updatedTransports));
    alert("Transport updated successfully!");
    navigate("/view-transport");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        Update Transport
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Transport Name</label>
          <input type="text" value={transportName} onChange={(e) => setTransportName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" required></textarea>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Back</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Transport</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateTransport;
