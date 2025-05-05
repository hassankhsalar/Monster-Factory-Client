import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import 'animate.css';

const Newsletter = () => {
  const axiosPublic = useAxiosPublic(); // Axios instance for public requests
  const [email, setEmail] = useState(""); // State to manage the email input
  const [message, setMessage] = useState(""); // State for success/error message

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }
  
    const currentDate = new Date().toISOString(); // Get the current date in ISO format
  
    try {
      const response = await axiosPublic.post("/newsletter/subscribe", {
        email,
        date: currentDate, // Add the current date
      });
  
      console.log(response.data);
      if (response.data.insertedId) {
        Swal.fire({
          title: "Subscribed to newsletter successfully!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
        setEmail(""); // Clear the email input
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div>
      <div
        className="w-full h-[480px] bg-[url('https://i.ibb.co.com/VjMXWbr/pngtree-large-room-full-of-equipment-in-a-gym-picture-image-2611111.png')] object-center"
      >
        <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
          <h1 className="text-5xl antialiased mt-10 font-semibold leading-none text-center text-accent dark:text-accent">
            Get Our Updates
          </h1>
          <p className="pt-2 pb-8 text-xl antialiased text-center text-primary  dark:text-primary">
            Find out about events and other news
          </p>
          <div className="flex flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-3/5 p-3 rounded-l-lg sm:w-2/3 hover:scale-105 transition-transform"
            />
            <button
              onClick={handleSubscribe}
              type="button"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-violet-600 dark:bg-violet-600 dark:text-gray-50 hover:scale-105 transition-transform"
            >
              Subscribe
            </button>
          </div>
          {message && (
            <p className="mt-4 text-center text-lg font-medium dark:text-gray-50">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
