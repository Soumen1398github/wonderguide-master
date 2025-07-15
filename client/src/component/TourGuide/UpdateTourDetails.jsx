import React, { useState, useEffect } from "react";
import Input from "../MyTour/Input";
import Textarea from "../MyTour/Textarea";
import Select from "../MyTour/Select";
import DateInput from "../MyTour/DateInput";
import NavbarTourGuide from "../NavbarTourGuide";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateTourDetails() {
  const { tourId } = useParams();
  const [tourData, setTourData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExistingTourData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/tour/tours/${tourId}`);
      const tour = response.data;
      console.log("API response:", response.data);
      
      setTourData({
        ...tour,
        startTime: tour.startTime ? new Date(tour.startTime) : null,
        endTime: tour.endTime ? new Date(tour.endTime) : null,
      });
    } catch (error) {
      console.error("Failed to fetch tour data", error);
      toast.error("Failed to load tour details!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExistingTourData();
  }, [tourId]); // Add tourId as a dependency

  // Add a separate useEffect to log tourData when it changes
  useEffect(() => {
    if (tourData) {
      console.log("tourData updated:", tourData);
    }
  }, [tourData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("working")
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setTourData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const handleUpdateTour = async () => {
    try {
      const dataToSend = {
        ...tourData,
        startTime: tourData.startTime ? new Date(tourData.startTime).toISOString() : null,
        endTime: tourData.endTime ? new Date(tourData.endTime).toISOString() : null,
      };
  
      await axios.put(`${import.meta.env.VITE_SERVER}/api/tour/tours/${tourId}`, dataToSend);
      toast.success("Tour details updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update tour details!");
    }
  };

  if (isLoading) {
    return <p className="text-center text-lg">Loading tour details...</p>;
  }

  if (!tourData && !isLoading) {
    return <p className="text-center text-lg">No tour data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarTourGuide />
      <div className="border m-5 p-6 rounded-2xl bg-white shadow-lg">
        <form className="space-y-6">
          <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5">
            Update Tour Details
          </div>

          {/* Grid 1 - Tour Details */}
          <div className="grid grid-cols-4 gap-6">
            <Input label="Tour Name" name="tourName" type="text" value={tourData.tourName || ""} onChange={handleChange} />
            <Textarea label="Tour Description" name="tourDescription" value={tourData.tourDescription || ""} onChange={handleChange} />
            <Input label="From Location" name="fromLocation" type="text" value={tourData.fromLocation || ""} onChange={handleChange} />
            <Input label="To Location" name="toLocation" type="text" value={tourData.toLocation || ""} onChange={handleChange} />
          </div>

          {/* Grid 2 - Lodge Details */}
          <div className="grid grid-cols-4 gap-6">
            <Select label="Lodge" name="lodgeType" value={tourData.lodgeType || ""} onChange={handleChange} options={["Hotel", "Villa", "Bungalow"]} />
            <Input label="Lodge Name" name="lodgeName" type="text" value={tourData.lodgeName || ""} onChange={handleChange} />
            <Textarea label="Lodge Address" name="lodgeAddress" value={tourData.lodgeAddress || ""} onChange={handleChange} />
            <Select label="Transport" name="transportType" value={tourData.transportType || ""} onChange={handleChange} options={["Bus", "Train", "Flight"]} />
          </div>

          {/* Grid 3 - Transport Details */}
          <div className="grid grid-cols-4 gap-6">
            <Textarea label="Transport Description" name="transportDescription" value={tourData.transportDescription || ""} onChange={handleChange} />
            <Input label="Transport Registration No" name="transportRegNo" type="text" value={tourData.transportRegNo || ""} onChange={handleChange} />
            <Input label="Total Tour Days" name="totalTourDays" type="number" value={tourData.totalTourDays || ""} onChange={handleChange} />
            <Input label="No Of Tickets" name="noOfTickets" type="number" value={tourData.noOfTickets || ""} onChange={handleChange} />
          </div>

          {/* Grid 4 - Date, Price, Special Note */}
          <div className="grid grid-cols-3 gap-6">
            <Input label="Ticket Price" name="ticketPrice" type="text" value={tourData.ticketPrice || ""} onChange={handleChange} />
            <DateInput label="Select Start Time" selected={tourData.startTime || null} setSelected={(date) => handleDateChange("startTime", date)} />
            <DateInput label="Select End Time" selected={tourData.endTime || null} setSelected={(date) => handleDateChange("endTime", date)} />
          </div>

          {/* Special Note */}
          <div>
            <Textarea label="Special Note" name="specialNote" value={tourData.specialNote || ""} onChange={handleChange} />
          </div>

          {/* Update Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleUpdateTour}
              className="bg-blue-600 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Update Tour
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UpdateTourDetails;