import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import NavbarUser from "../NavbarUser";
import NavbarTourGuide from "../NavbarTourGuide";

const AiCallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      const userId = localStorage.getItem("id");
      const res = await fetch(`${import.meta.env.VITE_SERVER}/get-user-transcripts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
  
      const rawData = await res.json();
      // const filteredData = rawData.filter((log) => log.userId === userId); // Use triple equals for stricter check
      console.log(rawData);
      setLogs(rawData);
    };

    fetchLogs();
  }, []);

  const openModal = (log) => {
    setSelectedLog(log);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLog(null);
  };

  return (
    <>
    <NavbarTourGuide />
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">AI Call Logs</h2>
      <div className="overflow-auto">
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Language</th>
              <th className="border px-4 py-2">Called At</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
  {logs.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-gray-500 py-4">
        No call logs available
      </td>
    </tr>
  ) : (
    logs.map((log) => (
      <tr key={log._id}>
        <td className="border px-4 py-2">{log.name}</td>
        <td className="border px-4 py-2">{log.phone}</td>
        <td className="border px-4 py-2">{log.language}</td>
        <td className="border px-4 py-2">
          {new Date(log.createdAt).toLocaleString()}
        </td>
        <td className="border px-4 py-2">
          <button
            onClick={() => openModal(log)}
            className="px-2 py-1 bg-blue-600 text-white rounded"
          >
            View Details
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

      {selectedLog && (
        <Modal isOpen={modalOpen} onRequestClose={closeModal} className="p-6 bg-white rounded shadow-lg w-[90%] md:w-[50%] mx-auto mt-12">
          <h3 className="text-lg font-bold mb-2">Transcript Details</h3>
          <p><strong>Name:</strong> {selectedLog.name}</p>
          <p><strong>Phone:</strong> {selectedLog.phone}</p>
          <p><strong>Language:</strong> {selectedLog.language}</p>
          <p><strong>Transcript:</strong></p>
          <p className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{selectedLog.transcript}</p>
          <div className="mt-4">
            <h4 className="text-md font-semibold">Tour Details:</h4>
            {selectedLog.tour ? (
              <>
                <p><strong>Tour Name:</strong> {selectedLog.tour.tourName}</p>
                <p><strong>From:</strong> {selectedLog.tour.fromLocation}</p>
                <p><strong>To:</strong> {selectedLog.tour.toLocation}</p>
                <p><strong>Price:</strong> {selectedLog.tour.ticketPrice}</p>
              </>
            ) : (
              <p className="text-gray-500">No tour details found</p>
            )}
          </div>
          <button
            className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
    </>
  );
};

export default AiCallLogs;
