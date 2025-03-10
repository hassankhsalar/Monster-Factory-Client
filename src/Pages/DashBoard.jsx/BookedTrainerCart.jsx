import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Marquee from "react-fast-marquee";
import { FaBoltLightning } from "react-icons/fa6";

const BookedTrainerCart = () => {
  const [cart, refetch] = useCart();
  //console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.packagePrice, 0);
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };
  return (
    <div className="w-full dark:bg-slate-700">
      <Helmet>
        <title>MF || Cart</title>
      </Helmet>
      <Marquee className="bg-accent">
        <div > 
          <h1 className="flex items-center text-lg text-white h-8"> Enjoy 30% Off on all items this Ramadan <FaBoltLightning></FaBoltLightning></h1>
        </div>
      </Marquee>
      <div className="flex flex-col max-w-3xl  p-6 space-y-4 sm:p-10 dark:text-gray-800">
        <h2 className="text-xl flex gap-2 font-semibold dark:text-slate-400">
          Your cart{" "}
          <p className="px-4 flex justify-center  items-center font-thin rounded bg-accent text-white">
            Items:<strong>{cart.length}</strong>
          </p>
        </h2>
        <ul className="flex flex-col divide-y dark:divide-gray-300">
          {cart.map((item) => (
            <li
              key={item._id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                  src={item.trainerPhoto}
                  alt="Polaroid camera"
                />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8 dark:text-gray-400">
                        {item.classTitle}
                      </h3>
                      <p className="text-sm dark:text-gray-400">
                        {item.trainerName}
                      </p>
                      <p className="text-sm dark:text-gray-400">
                        {item.selectedTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold dark:text-gray-400">
                        {item.packagePrice}$
                      </p>
                    </div>
                  </div>
                  <div className="flex text-sm divide-x">
                    <button
                      onClick={() => handleDelete(item._id)}
                      type="button"
                      className="flex items-center px-2 py-1 pl-0 space-x-1 dark:text-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                      </svg>
                      <span>Remove</span>
                    </button>
                    <button
                      disabled
                      type="button"
                      className="flex items-center px-2 py-1 space-x-1 dark:text-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                      </svg>
                      <span>Add to favorites</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right dark:text-gray-400">
          <p>
            Total amount:
            <span className="font-semibold"> {totalPrice}$</span>
          </p>
          <p className="text-sm">Not including taxes</p>
        </div>
        <div className="flex justify-end space-x-4">
          <Link to="/allclasses">
            <button
              type="button"
              className="px-6 py-2 border dark:text-accent rounded-md border-violet-600"
            >
              Back
              <span className="sr-only sm:not-sr-only dark:text-gray-300"> to Classes</span>
            </button>
          </Link>
          {cart.length ? (
            <Link to="/dashboard/payment">
              <button
                disabled={!cart.length}
                type="button"
                className="px-6 py-2 border rounded-md bg-violet-600 text-gray-50 border-violet-600"
              >
                <span className="sr-only sm:not-sr-only">Continue to </span>
                 Checkout
              </button>
            </Link>
          ) : (
            <button
              disabled
              type="button"
              className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-50 border-violet-600"
            >
              <span className="sr-only sm:not-sr-only">Empty</span>
              Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedTrainerCart;
