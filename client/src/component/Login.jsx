import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("id", data.id);
        localStorage.setItem("profilePhoto", data.profilePhoto);
        localStorage.setItem("userName", `${data.firstName} ${data.lastName}`);

        toast.success("✅ Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(`❌ ${data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center p-10">
        <div className="border border-gray-400 rounded-2xl p-10 w-full max-w-md bg-white shadow-xl">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="text-center text-2xl font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5">
              Login
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email Id
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2.5 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2.5 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-2.5 rounded-lg hover:bg-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
