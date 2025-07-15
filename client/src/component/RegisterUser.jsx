import React, { useState } from "react";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";

function RegisterUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNo: "",
    streetCity: "",
    pincode: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (profilePhoto) {
        data.append("profilePhoto", profilePhoto);
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/users/register`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center p-10">
        <div className="border border-gray-400 rounded-2xl p-10 w-full max-w-3xl bg-white shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5">
              Register Here!!
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="John"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Doe"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="example@gmail.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="•••••••••"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="contactNo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contact No
                </label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  className="w-full p-2.5 border rounded-lg"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="streetCity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Street & City
                </label>
                <textarea
                  id="streetCity"
                  name="streetCity"
                  rows="2"
                  className="w-full p-2.5 border rounded-lg"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full p-2.5 border rounded-lg"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="w-full p-2.5 border rounded-lg"
                  // required
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border rounded-sm"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                I agree with the{" "}
                <a href="#" className="text-blue-600 underline">
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-2.5 rounded-lg hover:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
