
import { Helmet } from "react-helmet-async";
import useTrainerHooks from "../../hooks/useTrainerHooks";
import { Link } from "react-router-dom";

const AllTrainers = () => {
  const [trainers] = useTrainerHooks();
  console.log(trainers);

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
            <p className="max-w-2xl dark:text-gray-600">
              The Arts and craftsmen of Monster Factory
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer) => (
              <div
                className="space-y-2 rounded-t-lg flex flex-col items-center"
                key={trainer._id}
              >
                <img
                  alt={trainer.fullName}
                  className="object-cover w-full h-56 mx-auto mb-1 bg-center rounded-t-lg dark:bg-gray-500"
                  src={trainer.imageURL}
                />
                <div className="flex w-full flex-col h-56 justify-evenly items-center text-center bg-gray-500 rounded-b-xl text-white">
                  <h4 className="text-xl font-semibold">{trainer.fullName}</h4>
                  <p className="text-sm dark:text-gray-300">
                    {trainer.skills.join(" - ")}
                  </p>
                  <p className="text-sm dark:text-gray-300">Years of Experience :  {trainer.experience}</p>
                  <p>Availibility: {trainer.availableDays.join("-")}</p>
                  <p className="text-sm px-1 dark:text-gray-400">
                    {trainer.biography}
                  </p>
                </div>
                <button
                  type="button"
                  className="px-8 py-3 font-semibold rounded dark:bg-accent dark:text-gray-100"
                >
                  <Link to={`/alltrainers/${trainer._id}`}>
                    Know More
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllTrainers;
