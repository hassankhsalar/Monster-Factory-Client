import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { Helmet } from "react-helmet-async";
import blog2 from '/blog2.jpg';

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

    console.log(classTitle);

  const plans = [
    {
      name: "Beginner",
      price: 10,
      description: "Basic features to get the job done!",
      feature1: "1 weekly counselling",
      feature2: "1 progress checking session",
      feature3: "1 routine revision/week",
    },
    {
      name: "Pro",
      price: 24,
      description: "Extra Effort and sweet spot",
      feature1: "3 weekly counselling",
      feature2: "3 progress checking session",
      feature3: "2 routine revision/week",
    },
    {
      name: "Team",
      price: 72,
      description: "Hardcore preparation",
      feature1: "Unlimited weekly counselling",
      feature2: "7 progress checking session",
      feature3: "3 routine revision/week",
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
            navigate('/dashboard/bookedtrainercart')
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
    <div className="p-6 bg-gray-100 dark:bg-slate-700 min-h-screen">
      <Helmet>
        <title>MF || Booked Trainer</title>
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          { trainerPhoto ? <><img
            src={trainerPhoto}
            alt={trainerName}
            className="w-40 h-40 object-cover rounded-full mb-4"
          /></> : <><img
          src={blog2}
          alt={trainerName}
          className="w-40 h-40 object-cover rounded-full mb-4"
        /> </>}
          <h1 className="text-2xl font-bold mb-2 text-accent">{trainerName}</h1>
          <p className="text-gray-700 mb-4 dark:text-slate-400">
            <strong>Selected Time:</strong> {selectedTime}
          </p>
        </div>

        {/* Pricing Component Placeholder */}
        <div className="">
          <section className="py-6 dark:bg-slate-700 rounded-2xl  bg-gray-100 dark:text-gray-800">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl mx-auto mb-16 text-center">
                <span className="font-bold tracking-wider uppercase dark:text-violet-600">
                  Pricing
                </span>
                <h2 className="text-4xl font-bold lg:text-5xl dark:text-slate-300">
                  Choose your best plan
                </h2>
              </div>
              <div className="flex flex-wrap items-stretch -mx-4">
                <div className="flex gap-6 justify-evenly w-full mb-8">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="flex flex-grow flex-col  p-6 space-y-6 rounded shadow sm:p-8 dark:bg-slate-800 bg-gray-50"
                    >
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold dark:text-slate-400">{plan.name}</h4>
                        <span className="text-6xl font-bold dark:text-slate-400">
                          ${plan.price}
                        </span>
                      </div>
                      <p className="mt-3 leading-relaxed dark:text-gray-400">
                        {plan.description}
                      </p>
                      <ul className="flex-1 mb-6 dark:text-gray-400">
                        <li className="flex mb-2 space-x-2">
                          <FaCheckCircle className="text-accent text-xl" />
                          <span>{plan.feature1}</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                          <FaCheckCircle className="text-accent text-xl" />
                          <span>{plan.feature2}</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                          <FaCheckCircle className="text-accent text-xl" />
                          <span>{plan.feature3}</span>
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => handleSelectPlan(plan)}
                        className={`inline-block px-5 py-3 font-semibold tracking-wider text-center rounded ${
                          selectedPlan?.name === plan.name
                            ? "bg-violet-600 text-white"
                            : " bg-accent text-white dark:bg-violet-600 dark:text-gray-50"
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
          Join Now!
        </button>
      </div>
    </div>
  );
};

export default BookedTrainer;
