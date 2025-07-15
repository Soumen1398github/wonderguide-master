import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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

  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
    <Link to="/register">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register User</button>
    </Link>
    <Link to="/login">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </Link>
      
  </div>
  
  </div>
</nav>

    </div>
  )
}

export default Navbar;
