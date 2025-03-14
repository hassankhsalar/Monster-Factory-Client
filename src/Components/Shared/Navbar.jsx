import { useContext, useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FaCartShopping, FaCircleHalfStroke } from "react-icons/fa6";
import useCart from "../../hooks/useCart";


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const scrollPos = useRef(0);

  const [cart] = useCart();

  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };


  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < scrollPos.current);
      scrollPos.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`p-4 bg-white sticky top-0 w-full z-50 shadow-md transition-transform duration-300 dark:bg-slate-800 dark:text-gray-100 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
              className="flex items-center px-4 -mb-1 border-b-2  text-violet-600 border-violet-600  dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 text-violet-600 border-violet-600  border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/alltrainers"
            >
              All Trainers
            </Link>
          </li>
          {
            user? <><li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 text-violet-600 border-violet-600 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/allclasses"
            >
              All Classes
            </Link>
          </li></> : <></>
          }
          <li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 text-violet-600 border-violet-600 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/communityforums"
            >
              Community Forums
            </Link>
          </li>
          {
            user? <><li className="flex">
            <Link
              className="flex items-center px-4 -mb-1 text-violet-600 border-violet-600 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
              to="/dashboard/profile"
            >
              Dashboard
            </Link>
          </li></> : <></>
          }
          <li>
            <button
              onClick={() => {
                const isDark =
                  document.documentElement.classList.contains("dark");
                if (isDark) {
                  document.documentElement.classList.remove("dark");
                  localStorage.setItem("theme", "light");
                } else {
                  document.documentElement.classList.add("dark");
                  localStorage.setItem("theme", "dark");
                }
              }}
              className="px-4 flex py-2 mt-4 bg-primary text-white rounded"
            >
              <FaCircleHalfStroke className="text-2xl"></FaCircleHalfStroke>
            </button>
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
                    className="w-10 h-10 mt-1 rounded-full ring-2 ring-offset-4  dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                    src={user.photoURL}
                  />
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="px-8 py-3 font-semibold rounded bg-violet-400 dark:bg-violet-400 dark:text-gray-100"
                  >
                    Logout
                  </button>
                  <Link
                    to="/dashboard/bookedtrainercart"
                    className="relative inline-flex items-center justify-center px-4 py-3 text-lg text-white rounded bg-primary"
                  >
                    <FaCartShopping></FaCartShopping>
                    <span className="absolute -top-2.5 -right-2.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                      +{cart.length}
                      <span className="sr-only"> new emails </span>
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
                  className="px-8 mr-4 py-3 font-semibold rounded bg-slate-400 dark:bg-slate-400 dark:text-black"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="self-center px-8 py-3 font-semibold rounded bg-violet-600 dark:bg-violet-600 dark:text-gray-50"
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
            className="w-6 h-6 dark:text-gray-400"
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
            <li>
              <li>
                <button
                  onClick={() => {
                    const isDark =
                      document.documentElement.classList.contains("dark");
                    if (isDark) {
                      document.documentElement.classList.remove("dark");
                      localStorage.setItem("theme", "light");
                    } else {
                      document.documentElement.classList.add("dark");
                      localStorage.setItem("theme", "dark");
                    }
                  }}
                  className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Toggle Dark Mode
                </button>
              </li>
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
