import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AppliedTrainerDetails = () => {
  const { id } = useParams(); // Extract _id from URL parameters
  const axiosSecure = useAxiosSecure();
  const [trainer, setTrainer] = useState(null); // State to store trainer data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/trainers/${id}`); // Fetch specific trainer
        setTrainer(response.data);
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrainer(); // Call fetch function if id exists
    }
  }, [id, axiosSecure]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!trainer) {
    return <div>No trainer data found.</div>;
  }

  return (
    <div>
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img
          src={trainer.imageURL} // Fallback image
          alt={trainer.fullName || "Trainer"}
          className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">
              {trainer.fullName}
            </h2>
            <p className="dark:text-gray-800">
              Skills: {trainer.skills?.join(", ")}
            </p>
            <p className="dark:text-gray-800">
              AvailableDays : {trainer.availableDays?.join(", ")}
            </p>
            <p className="dark:text-gray-800">
              Experience: {trainer.experience} Years
            </p>
            <p className="dark:text-gray-800">
              AvailableTime: {trainer.availableTime}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;
