import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaFile, FaHome, FaShoppingCart } from "react-icons/fa";
import useUser from "../../hooks/useUser";

const DashBoard = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  console.log(user);

  const isAdmin = true;

  const [users, refetch, isLoading] = useUser();
  console.log(users);

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  if (isLoading) {
    return (
        <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
    </div>
    );
  }

  return (
    <div className="bg-">
      <div className="h-full p-3 space-y-2 w-60 dark:bg-fuchsia-300 dark:text-gray-800">
        <div className="flex items-center p-2 space-x-4">
          <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
            <span className="flex items-center space-x-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline "
              >
                View profile
              </a>
            </span>
          </div>
        </div>
        <div className="divide-y flex flex-col justify-center ga dark:divide-gray-300">
          <ul className="pt-2 pb-4 space-y-3 text-sm">
            <li className="">
              <Link className="flex gap-2 text-sm px-3" to="/dashboard">
                <FaHome className="text-xl"></FaHome> Dashboard
              </Link>
            </li>
            {/* member only */}
            <li className="">
              <Link
                className="flex gap-2 text-sm px-3"
                to="/dashboard/bookedtrainercart"
              >
                <FaShoppingCart className="text-xl"></FaShoppingCart> Cart
              </Link>
            </li>
            <li className="">
              <Link
                className="flex gap-2 text-sm px-3"
                to="/dashboard/bookedtrainercart"
              >
                <FaFile className="text-lg" /> My Applications
              </Link>
            </li>
            {/* member end */}

            {/* admin only */}
            {isAdmin ? (
              <>
                {" "}
                <li className="">
                  <Link
                    className="flex gap-2 text-sm px-3"
                    to="/dashboard/alltrainer"
                  >
                    <FaShoppingCart className="text-xl"></FaShoppingCart> All
                    Trainers
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="flex gap-2 text-sm px-3"
                    to="/dashboard/appliedtrainer"
                  >
                    <FaShoppingCart className="text-xl"></FaShoppingCart>{" "}
                    Applied Trainer
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="flex gap-2 text-sm px-3"
                    to="/dashboard/bookedtrainercart"
                  >
                    <FaShoppingCart className="text-xl"></FaShoppingCart>{" "}
                    Newsletter Subscribers
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="flex gap-2 text-sm px-3"
                    to="/dashboard/bookedtrainercart"
                  >
                    <FaShoppingCart className="text-xl"></FaShoppingCart>{" "}
                    Balance
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="flex gap-2 text-sm px-3"
                    to="/dashboard/bookedtrainercart"
                  >
                    <FaShoppingCart className="text-xl"></FaShoppingCart> Add
                    New class
                  </Link>
                </li>
              </>
            ) : (
              <> </>
            )}
            {/* admin end */}
          </ul>

          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className="">
              <Link className="flex gap-2 text-sm px-3" to="/">
                <FaHome className="text-xl"></FaHome> Home
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-600"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
