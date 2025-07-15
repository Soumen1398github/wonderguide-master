import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../NavbarUser";

const AddTourGuide = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !city || !pin || !mobile || !email || !experience || !language) {
      alert("Please fill all fields!");
      return;
    }

    const storedGuides = JSON.parse(localStorage.getItem("tourGuides")) || [];
    const newGuide = {
      id: storedGuides.length + 1, // Auto-increment ID
      name,
      city,
      pin,
      mobile,
      email,
      experience,
      language,
    };

    storedGuides.push(newGuide);
    localStorage.setItem("tourGuides", JSON.stringify(storedGuides));

    alert("Tour Guide added successfully!");
    navigate("/view-tour-guide");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser/>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 mb-6">
        Add Tour Guide
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter guide's name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter city"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">PIN Code</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter PIN Code"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter mobile number"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter email ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter years of experience"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter language(s) spoken"
            required
          />
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Back
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Tour Guide
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddTourGuide;
