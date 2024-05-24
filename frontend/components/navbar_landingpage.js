import React from 'react';

const Navbar_landingpage = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logo.png" alt="Company Logo" className="h-12" />
          <span className="text-xl font-semibold text-gray-900">ProScheduler</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Link Login */}
          <a href="/login" className="bg-gray-300 hover:bg-gray-400 py-2 px-2 text-sm rounded-lg mr-3">
            Log in
          </a>
          {/* Link Register */}
          <a href="/register" className="bg-violet-800 hover:bg-purple-700 text-white text-sm py-2 px-2 rounded-lg" >
            Sign up
          </a>
        </div>
        {/* Hapus bagian menu toggle (hamburger menu) */}
        <div className="hidden md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <a href="/" className="block py-2 px-3 text-blue-700 bg-transparent md:bg-transparent md:text-blue-700 md:p-0 border-b-2 border-blue-700" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/home" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">My Project</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_landingpage;
