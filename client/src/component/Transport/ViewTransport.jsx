import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const ViewTransport = () => {
  const [transports, setTransports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTransports =
      JSON.parse(localStorage.getItem("transports")) || [];
    setTransports(storedTransports);
  }, []);

  const handleDelete = (id) => {
    const updatedTransports = transports.filter(
      (transport) => transport.id !== id
    );
    localStorage.setItem("transports", JSON.stringify(updatedTransports));
    setTransports(updatedTransports);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser />
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        View Transports
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Transport Id</th>
            <th className="border p-2">Transport Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transports.length > 0 ? (
            transports.map((transport) => (
              <tr key={transport.id} className="border-b">
                <td className="border p-2">{transport.id}</td>
                <td className="border p-2">{transport.transportName}</td>
                <td className="border p-2">{transport.description}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/update-transport/${transport.id}`)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(transport.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No transports available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewTransport;
