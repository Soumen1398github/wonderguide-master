import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import NavbarTourGuide from "../NavbarTourGuide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTour() {
  const [formData, setFormData] = useState({
    tourName: "",
    tourDescription: "",
    fromLocation: "",
    toLocation: "",
    lodgeType: "",
    lodgeName: "",
    lodgeAddress: "",
    transportType: "",
    transportDescription: "",
    transportRegNo: "",
    totalTourDays: "",
    noOfTickets: "",
    ticketPrice: "",
    specialNote: "",
  });

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = async () => {
    const userId = localStorage.getItem("id");

    // Simple validation
    if (!startTime || !endTime || !selectedFile1 || !selectedFile2 || !selectedFile3) {
      toast.error("Please fill in all required fields including dates and images.");
      return;
    }

    const data = new FormData();
    data.append("userId", userId);

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("startTime", startTime.toISOString());
    data.append("endTime", endTime.toISOString());
    data.append("image1", selectedFile1);
    data.append("image2", selectedFile2);
    data.append("image3", selectedFile3);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/tour/tours`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success("✅ Tour submitted successfully!");
      } else {
        toast.error("❌ Error submitting tour.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarTourGuide />
      <div className="border m-5 p-6 rounded-2xl bg-white shadow-lg">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="text-center text-2xl font-semibold text-white bg-blue-700 rounded-xl px-5 py-2.5">
            Add Tour
          </div>

          {/* Grid 1 */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block mb-1 font-medium">Tour Name</label>
              <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.tourName} onChange={e => handleChange("tourName", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tour Description</label>
              <textarea required rows="2" className="w-full border px-3 py-2 rounded-lg" value={formData.tourDescription} onChange={e => handleChange("tourDescription", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">From Location</label>
              <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.fromLocation} onChange={e => handleChange("fromLocation", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">To Location</label>
              <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.toLocation} onChange={e => handleChange("toLocation", e.target.value)} />
            </div>
          </div>

          {/* Grid 2 */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block mb-1 font-medium">Lodge Type</label>
              <select required className="w-full border px-3 py-2 rounded-lg" value={formData.lodgeType} onChange={e => handleChange("lodgeType", e.target.value)}>
                <option value="">Select</option>
                <option>Hotel</option>
                <option>Villa</option>
                <option>Bunglo</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Lodge Name</label>
              <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.lodgeName} onChange={e => handleChange("lodgeName", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Lodge Address</label>
              <textarea required rows="2" className="w-full border px-3 py-2 rounded-lg" value={formData.lodgeAddress} onChange={e => handleChange("lodgeAddress", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Transport Type</label>
              <select required className="w-full border px-3 py-2 rounded-lg" value={formData.transportType} onChange={e => handleChange("transportType", e.target.value)}>
                <option value="">Select</option>
                <option>Bus</option>
                <option>Train</option>
                <option>Flight</option>
              </select>
            </div>
          </div>

          {/* Grid 3 */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block mb-1 font-medium">Transport Description</label>
              <textarea required rows="2" className="w-full border px-3 py-2 rounded-lg" value={formData.transportDescription} onChange={e => handleChange("transportDescription", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Transport Reg No</label>
              <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.transportRegNo} onChange={e => handleChange("transportRegNo", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Total Tour Days</label>
              <input required type="number" className="w-full border px-3 py-2 rounded-lg" value={formData.totalTourDays} onChange={e => handleChange("totalTourDays", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">No. of Tickets</label>
              <input required type="number" className="w-full border px-3 py-2 rounded-lg" value={formData.noOfTickets} onChange={e => handleChange("noOfTickets", e.target.value)} />
            </div>
          </div>

          {/* Grid 4 */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block mb-1 font-medium">Ticket Price</label>
              <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.ticketPrice} onChange={e => handleChange("ticketPrice", e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Start Time</label>
              <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} className="w-full border px-3 py-2 rounded-lg" showTimeSelect dateFormat="Pp" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">End Time</label>
              <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} className="w-full border px-3 py-2 rounded-lg" showTimeSelect dateFormat="Pp" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image 1</label>
              <input required type="file" onChange={e => setSelectedFile1(e.target.files[0])} />
            </div>
          </div>

          {/* Grid 5 */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block mb-1 font-medium">Image 2</label>
              <input required type="file" onChange={e => setSelectedFile2(e.target.files[0])} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image 3</label>
              <input required type="file" onChange={e => setSelectedFile3(e.target.files[0])} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Special Note</label>
              <textarea required rows="2" className="w-full border px-3 py-2 rounded-lg" value={formData.specialNote} onChange={e => handleChange("specialNote", e.target.value)} />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={submitHandler}
              className="bg-blue-600 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Submit Tour
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default AddTour;
