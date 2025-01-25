import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { Helmet } from "react-helmet-async";

const BookedTrainer = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  // Accessing the state data passed from TrainerDetails
  const { trainerName, trainerPhoto, selectedTime, classTitle, trainerId } =
    location.state || {};

  const plans = [
    {
      name: "Beginner",
      price: 10,
      description: "Etiam ac convallis enim, eget euismod dolor.",
    },
    {
      name: "Pro",
      price: 24,
      description: "Morbi cursus ut sapien sit amet consectetur.",
    },
    {
      name: "Team",
      price: 72,
      description: "Phasellus ultrices bibendum nibh in vehicula.",
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // const handleProceedToPayment = () => {
  //     if (selectedPlan) {
  //       navigate("/payment", {
  //         state: {
  //           trainerName,
  //           trainerPhoto,
  //           selectedTime,
  //           selectedPackage: selectedPlan,
  //         },
  //       });
  //     }
  //   };

  const handleAddToCart = () => {
    if (user && user.email) {
      if (selectedPlan) {
        const bookingInfo = {
          email: user?.email,
          trainerName: trainerName,
          trainerPhoto: trainerPhoto,
          selectedTime: selectedTime,
          classTitle: classTitle,
          trainerId: trainerId,
          packagePrice: selectedPlan.price,
        };
        axiosPublic.post("/cart", bookingInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Login to add to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //sending user to login
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>MF || Booked Trainer</title>
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={trainerPhoto}
            alt={trainerName}
            className="w-40 h-40 object-cover rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{trainerName}</h1>
          <p className="text-gray-700 mb-4">
            <strong>Selected Time:</strong> {selectedTime}
          </p>
        </div>

        {/* Pricing Component Placeholder */}
        <div className="">
          <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl mx-auto mb-16 text-center">
                <span className="font-bold tracking-wider uppercase dark:text-violet-600">
                  Pricing
                </span>
                <h2 className="text-4xl font-bold lg:text-5xl">
                  Choose your best plan
                </h2>
              </div>
              <div className="flex flex-wrap items-stretch -mx-4">
                <div className="flex gap-6 justify-evenly w-full border-2 mb-8">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="flex flex-grow flex-col  p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50"
                    >
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold">{plan.name}</h4>
                        <span className="text-6xl font-bold">
                          ${plan.price}
                        </span>
                      </div>
                      <p className="mt-3 leading-relaxed dark:text-gray-600">
                        {plan.description}
                      </p>
                      <ul className="flex-1 mb-6 dark:text-gray-600">
                        <li className="flex mb-2 space-x-2">
                          <FaCheckCircle className="text-accent text-xl" />
                          <span>Aenean quis</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                          <FaCheckCircle className="text-accent text-xl" />
                          <span>Morbi semper</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                          <FaCheckCircle className="text-accent text-xl" />
                          <span>Tristique enim nec</span>
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => handleSelectPlan(plan)}
                        className={`inline-block px-5 py-3 font-semibold tracking-wider text-center rounded ${
                          selectedPlan?.name === plan.name
                            ? "bg-violet-600 text-white"
                            : "dark:bg-violet-600 dark:text-gray-50"
                        }`}
                      >
                        {selectedPlan?.name === plan.name
                          ? "Selected"
                          : "Select Plan"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Join Now Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedPlan}
          className="px-5 py-3 font-bold text-white bg-green-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookedTrainer;
