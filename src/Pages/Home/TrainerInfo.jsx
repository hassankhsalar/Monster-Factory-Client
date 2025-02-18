import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebook, FaTwitter, FaX } from "react-icons/fa6";

const TrainerInfo = () => {
  const [trainers, setTrainers] = useState([]);

  
  useEffect(() => {
    fetch("trainer.json") 
      .then((response) => response.json())
      .then((data) => setTrainers(data))
      .catch((error) => console.error("Error fetching trainer data:", error));
  }, []);

  return (
    <div>
      <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
          
          <h1 className="text-4xl bg-accent text-white p-4 rounded-2xl font-bold leading-none text-center sm:text-5xl">
            The Hearts of Monster factory
          </h1>
          <div className="flex flex-row flex-wrap-reverse justify-center mt-8">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-gray-800 dark:text-gray-100"
              >
                <img
                  alt={`${trainer.fullName}`}
                  className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center object-cover rounded-full dark:bg-gray-500"
                  src={trainer.imageURL}
                />
                <div className="flex-1 my-4">
                  <p className="text-xl font-semibold leading-snug">
                    {trainer.fullName}
                  </p>
                  <p>{trainer.skills.join(", ")}</p>
                </div>
                <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                  <a
                    rel="noopener noreferrer"
                    href={`mailto:${trainer.email}`}
                    title="Email"
                    className="dark:text-gray-50 hover:dark:text-violet-600"
                  >
                    <FaEnvelope></FaEnvelope>
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/mrolympiallc"
                    title="facebook"
                    className="dark:text-gray-50 hover:dark:text-violet-600"
                  >
                    <FaFacebook></FaFacebook>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainerInfo;
