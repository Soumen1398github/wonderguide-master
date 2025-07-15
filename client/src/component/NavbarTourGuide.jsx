import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavbarTourGuide() {
  const [isAddTour, setIsAddTour] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };
  const profilePhoto = localStorage.getItem("profilePhoto");
  const userName = localStorage.getItem("userName");
  const profilePhotoURL = profilePhoto
    ? `${import.meta.env.VITE_SERVER}/uploads/${profilePhoto}`
    : `https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg`;
  // console.log(`${import.meta.env.VITE_SERVER}/uploads/User_icon_2.svg.png}`)

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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

          <div className="flex gap-5 items-center">
            <div>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className="relative">
                  <button
                    onClick={() => setIsAddTour(!isAddTour)}
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    My Tours
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isAddTour && (
                    <div className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <Link to="/add-tour">
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Add Tour
                            </a>
                          </li>
                        </Link>
                        <li>
                          <a
                            href="/view-tour"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            View Tours
                          </a>
                        </li>
                        <li>
                          <a
                            href="/view-call-logs"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Ai Call Logs
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <Link to="/my-tour-bookings">
                  <li className="relative">
                    <button className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                      My Tour Bookings
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {userName}
                        </span>
                        {/* <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span> */}
                      </div>
                      <ul className="py-2">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Earnings
                          </a>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarTourGuide;
