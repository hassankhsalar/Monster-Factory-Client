import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrainerDetails = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/trainers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trainer data");
        }
        const data = await response.json();
        setTrainer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerDetails();
  }, [id]);

  if (loading) {
    return <p>Loading trainer details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!trainer) {
    return <p>No trainer found with the specified ID.</p>;
  }

  return (
    <section className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={trainer.imageURL}
          alt={trainer.fullName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{trainer.fullName}</h2>
          <p><strong>Email:</strong> {trainer.email}</p>
          <p><strong>Age:</strong> {trainer.age}</p>
          <p><strong>Experience:</strong> {trainer.experience} years</p>
          <p><strong>Biography:</strong> {trainer.biography}</p>
          <p>
            <strong>Skills:</strong>{" "}
            {trainer.skills?.length
              ? trainer.skills.join(", ")
              : "No skills listed"}
          </p>
          <p>
            <strong>Available Days:</strong>{" "}
            {trainer.availableDays?.length
              ? trainer.availableDays.join(", ")
              : "Not specified"}
          </p>
          <p><strong>Available Time:</strong> {trainer.availableTime}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                trainer.status === "pending" ? "text-yellow-500" : "text-green-500"
              }`}
            >
              {trainer.status}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetails;
