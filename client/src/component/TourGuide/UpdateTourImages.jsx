import React, { useEffect, useState } from "react";
import NavbarTourGuide from "../NavbarTourGuide";
import FileInput from "../MyTour/FileInput";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateTourImages = () => {
  const { tourId } = useParams();

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch current tour data and set images
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/tour/tours/${tourId}`);
        const tour = res.data;

        const imageUrls = [
          tour.image1 || "https://thumbs.dreamstime.com/b/print-346146479.jpg",
          tour.image2 || "https://thumbs.dreamstime.com/b/print-346146479.jpg",
          tour.image3 || "https://thumbs.dreamstime.com/b/print-346146479.jpg",
        ];

        setPreviewImages(imageUrls);
      } catch (error) {
        console.error("Failed to load tour images", error);
      }
    };

    if (tourId) {
      fetchTour();
    }
  }, [tourId]);

  const handleFileChange = (index, file) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previewImages];
    newFiles[index] = file;
    newPreviews[index] = file ? URL.createObjectURL(file) : previewImages[index];
    setSelectedFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  const handleUpdateImages = async () => {
    if (!tourId) {
      alert("Tour ID not found!");
      return;
    }

    const formData = new FormData();
    if (selectedFiles[0]) formData.append("image1", selectedFiles[0]);
    if (selectedFiles[1]) formData.append("image2", selectedFiles[1]);
    if (selectedFiles[2]) formData.append("image3", selectedFiles[2]);

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/tour/tours/${tourId}/images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Images updated successfully!");
      console.log("Updated tour:", res.data);
    } catch (error) {
      console.error("Error updating images", error);
      setMessage("Failed to update images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarTourGuide />
      <div className="max-w-3xl mx-auto p-6 m-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-green-600 text-center">Update Tour Images</h2>

        <div className="flex justify-center gap-4 mt-4">
          {previewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Tour Image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <FileInput
            label="Image 1"
            selectedFile={selectedFiles[0]}
            setSelectedFile={(file) => handleFileChange(0, file)}
          />
          <FileInput
            label="Image 2"
            selectedFile={selectedFiles[1]}
            setSelectedFile={(file) => handleFileChange(1, file)}
          />
          <FileInput
            label="Image 3"
            selectedFile={selectedFiles[2]}
            setSelectedFile={(file) => handleFileChange(2, file)}
          />
        </div>

        <button
          onClick={handleUpdateImages}
          className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Images"}
        </button>

        {message && (
          <p className={`mt-4 text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateTourImages;
