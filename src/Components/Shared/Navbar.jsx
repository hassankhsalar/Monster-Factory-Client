import React, { useState } from "react";
import logo from '/logo.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img className="w-20" src={logo} alt="Logo" />
        </a>
        {/* links */}
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <Link className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600" to='/'>Home</Link>
          </li>
          <li className="flex">
            <Link className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600" to='/alltrainers'>All Trainers</Link>
          </li>
          <li className="flex">
            <Link className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600" to='/classes'>All Classes</Link>
          </li>
          <li className="flex">
            <Link className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600" to='/forums'>Community Forums</Link>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button className="self-center px-8 py-3 rounded">Sign in</button>
          <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
            Sign up
          </button>
        </div>
        <button className="p-4 lg:hidden" onClick={toggleDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 lg:hidden">
            {/* links */}
          <ul className="flex flex-col p-2">
            <li>
              <Link className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700" to='/'>Home</Link>
            </li>
            <li>
              <Link className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700" to='/alltrainers'>All Trainers</Link>
            </li>
            <li>
              <Link className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700" to='/classes'>All Classes</Link>
            </li>
            <li>
              <Link className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700" to='/forums'>Community Forums</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
