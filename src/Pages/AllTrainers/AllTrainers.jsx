import { Helmet } from "react-helmet-async";
import useTrainerHooks from "../../hooks/useTrainerHooks";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const AllTrainers = () => {
  const [trainers] = useTrainerHooks();

  return (
    <div>
      <Helmet>
        <title>MF || All Trainer</title>
      </Helmet>
      <section className="py-6 dark:text-gray-800">
        <div className="container p-4 mx-auto space-y-16 sm:p-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold leading-none sm:text-5xl">
              Meet our Trainers
            </h3>
            <p className="max-w-2xl dark:text-gray-300">
              The Arts and craftsmen of Monster Factory
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer) => (
              <div
                className="w-full max-w-xs mx-auto flex flex-col items-center bg-white rounded-lg shadow-md dark:bg-gray-800"
                key={trainer._id}
              >
                <img
                  alt={trainer.fullName}
                  className="object-cover w-full h-56 rounded-t-lg"
                  src={trainer.imageURL}
                />
                <div className="flex flex-col justify-between items-center text-center p-4 w-full h-60 bg-gray-500 text-white rounded-b-lg">
                  <h4 className="text-xl font-semibold">{trainer.fullName}</h4>
                  <p className="text-sm dark:text-gray-300">
                    {trainer.skills.join(" - ")}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    Years of Experience: {trainer.experience}
                  </p>
                  <p className="text-sm">
                    Availability: {trainer.availableDays.join(" - ")}
                  </p>
                  <p className="text-sm px-1 overflow-hidden dark:text-gray-400">
                    {trainer.biography}
                  </p>
                </div>
                <div className="flex gap-4 my-3">
                  <FaFacebook className="text-2xl text-blue-600" />
                  <FaTwitter className="text-2xl text-blue-400" />
                  <FaYoutube className="text-2xl text-red-600" />
                </div>
                <Link to={`/alltrainers/${trainer._id}`} className="w-full">
                  <button
                    type="button"
                    className="w-full px-8 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-b-lg"
                  >
                    Know More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllTrainers;
