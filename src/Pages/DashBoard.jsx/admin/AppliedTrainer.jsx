import { Helmet } from "react-helmet-async";
import useTrainer from "../../../hooks/useTrainer";
import { Link } from "react-router-dom";

const AppliedTrainer = () => {
  const [trainers, refetch, isLoading] = useTrainer();
  const approvedTrainers = trainers.filter(
    (trainer) => trainer.status === "pending" && trainer.role === "member"
  );

  if (isLoading) {
    return (
      <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
        <div className="h-48 rounded-t dark:bg-gray-300"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
          <div className="w-full h-6 rounded dark:bg-gray-300"></div>
          <div className="w-full h-6 rounded dark:bg-gray-300"></div>
          <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>MF || Applied Trainer</title>
      </Helmet>
      <div className="container mt-8 p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          All Trainers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-base text-left whitespace-nowrap">
            <colgroup>
              <col className="w-16" />
              <col />
              <col />
              <col />
              <col />
              <col className="w-16" />
            </colgroup>
            <thead>
              <tr className="dark:bg-gray-300">
                <th className="p-3 px-8">Index</th>
                <th className="p-3 px-8">Name</th>
                <th className="p-3 px-8">Experience</th>
                <th className="p-3 px-8">Email</th>
                <th className="p-3 px-8">Verdict</th>
                <th className="p-3 px-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {approvedTrainers.map((trainer, index) => (
              <tbody
                key={trainer._id}
                className="border-b dark:bg-gray-50 dark:border-gray-300"
              >
                <tr>
                  <td className="px-8 text-2xl font-medium dark:text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-8 py-2">
                    <p>{trainer.fullName}</p>
                  </td>
                  <td className="px-8 py-2">
                    <span>{trainer.experience}</span>
                  </td>

                  <td className="px-8 py-2">
                    <p>{trainer.email}</p>
                  </td>
                  <td className="px-8 py-2">
                    <button className="px-4 bg-accent py-1 text-white rounded-lg">
                      <Link
                        to={`/dashboard/appliedtrainerdetails/${trainer._id}`}
                      >
                        Details
                      </Link>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainer;
