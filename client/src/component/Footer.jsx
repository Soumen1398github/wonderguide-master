import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 mt-10">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center gap-3 rtl:gap-3">
                <img
                  src="logo.png"
                  className="h-10 w-10 object-contain"
                  alt="Wonder Guide Logo"
                />
                <span className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">
                  Wonder
                  <span className="text-yellow-600 dark:text-yellow-400">Guide</span>
                </span>
              </a>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Explore destinations, book  cuyivvcyici, and create unforgettable memories with us.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Company
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="/about" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Services
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="/tours" className="hover:underline">
                      Tour Packages
                    </a>
                  </li>
                  <li>
                    <a href="/bookings" className="hover:underline">
                      Bookings
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="/privacy" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a href="/" className="hover:underline">
                WonderGuide™
              </a>
              . All rights reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <span className="sr-only">YouTube</span>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;