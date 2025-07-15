import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavbarUser() {
  const [isLocation, setIsLocation] = useState(false);
  const [isTourGuide, setIsTourGuide] = useState(false);
  const [isAddTransport, setIsAddTransport] = useState(false);
  const [isAddLodge, setIsAddLodge] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };
  const profilePhoto = localStorage.getItem("profilePhoto");
  const userName = localStorage.getItem("userName");
  const profilePhotoURL = profilePhoto ? `${import.meta.env.VITE_SERVER}/uploads/${profilePhoto}` : "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
  // console.log(profilePhoto)

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Left Side - Logo */}
        <a href="/" className="flex items-center gap-3 rtl:gap-3">
            <img
              src="/logo.png"
              className="h-10 w-10 object-contain"
              alt="Logo"
            />
            <span className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">
              Wonder
              <span className="text-yellow-600 dark:text-yellow-400">
                Guide
              </span>
            </span>
          </a>


        {/* Right Side - Sections and Logout */}
        <div className="flex items-center space-x-8">
          {/* Sections */}
          <ul className="flex space-x-8 font-medium">
            {/* Location Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsLocation(!isLocation)}
                className="flex items-center text-gray-900 hover:text-blue-700 dark:text-white"
              >
                Location
                <svg className="w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isLocation && (
                <div className="absolute z-50 bg-white shadow-md rounded-lg w-44 mt-2 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="/add-location" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Add Location
                      </a>
                    </li>
                    <li>
                      <a href="/view-location" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        View Locations
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Tour Guide Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsTourGuide(!isTourGuide)}
                className="flex items-center text-gray-900 hover:text-blue-700 dark:text-white"
              >
                Tour Guide
                <svg className="w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isTourGuide && (
                <div className="absolute z-50 bg-white shadow-md rounded-lg w-44 mt-2 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="/user-booked-tour" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Booked Tour
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Transport Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsAddTransport(!isAddTransport)}
                className="flex items-center text-gray-900 hover:text-blue-700 dark:text-white"
              >
                Transport
                <svg className="w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isAddTransport && (
                <div className="absolute z-50 bg-white shadow-md rounded-lg w-44 mt-2 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="/add-transport" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Add Transport
                      </a>
                    </li>
                    <li>
                      <a href="/view-transport" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        View Transports
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Lodge Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsAddLodge(!isAddLodge)}
                className="flex items-center text-gray-900 hover:text-blue-700 dark:text-white"
              >
                Lodge
                <svg className="w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isAddLodge && (
                <div className="absolute z-50 bg-white shadow-md rounded-lg w-44 mt-2 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="/add-lodge" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Add Lodge
                      </a>
                    </li>
                    <li>
                      <a href="/view-lodge" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        View Lodges
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>

          {/* Logout + User Icon */}
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={handleLogout}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Logout
            </button> */}

            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center text-sm rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={showUserDropdown}
                aria-haspopup="true"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={profilePhotoURL}
                  alt="user"
                />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{userName}</span>
                    {/* <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span> */}
                  </div>
                  <ul className="py-2">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;
