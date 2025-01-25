import React, { useContext, useState } from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [ cart ] = useCart();

  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

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
            <Link
              className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/alltrainers"
            >
              All Trainers
            </Link>
          </li>
          <li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/allclasses"
            >
              All Classes
            </Link>
          </li>
          <li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/communityforums"
            >
              Community Forums
            </Link>
          </li>
          <li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/dashboard/profile"
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {user ? (
            <>
              {" "}
              <div className="flex flex-col items-center justify-center">
                <div className="flex space-x-5">
                  <img
                    alt=""
                    className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                    src={user.photoURL}
                  />
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-100"
                  >
                    Logout
                  </button>
                  <Link to='/dashboard/bookedtrainercart' className="relative inline-flex items-center justify-center px-4 py-3 text-lg text-white rounded bg-primary">
                    <FaCartShopping></FaCartShopping>
                    <span className="absolute -top-2.5 -right-2.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                      +{cart.length}<span className="sr-only"> new emails </span>
                    </span>
                  </Link>
                </div>
              </div>{" "}
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link
                  className="px-8 mr-4 py-3 font-semibold rounded dark:bg-slate-400 dark:text-black"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                  to="/register"
                >
                  Register
                </Link>
              </li>{" "}
            </>
          )}
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
              <Link
                className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                to="/alltrainers"
              >
                All Trainers
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                to="/allclasses"
              >
                All Classes
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                to="/communityforums"
              >
                Community Forums
              </Link>
            </li>

            {user ? (
              <>
                {" "}
                <li onClick={handleLogout}>
                  <Link
                    className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    to="/login"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                <Link
                className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                to="/dashboard/profile"
              >
                Cart/Dash
              </Link>
                  </li>{" "}
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link
                    className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
