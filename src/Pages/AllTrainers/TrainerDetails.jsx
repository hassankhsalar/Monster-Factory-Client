import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { Parallax } from "react-parallax";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { classTitle, trainerId } = location.state || {};

  const handleBooking = (time) => {
    navigate("/bookedtrainer", {
      state: {
        trainerName: trainer.fullName,
        trainerPhoto: trainer.imageURL,
        selectedTime: time,
        classTitle: classTitle,
        trainerId: trainerId,
        // Pricing and other details can be added here
      },
    });
  };

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

  // Available time options
  const availableTimes = ["10:00am-11:59am", "2:00pm-4:00pm", "8:00pm-10:00pm"];

  return (
    <section className="p-6 bg-gray-100">
      <Helmet>
        <title>MF || {trainer.fullName} </title>
      </Helmet>
      <div className="max-w-4xl flex mb-24 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-1/2">
          <img
            src={trainer.imageURL}
            alt={trainer.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 w-1/2 ">
          <h2 className="text-2xl font-bold mb-4">{trainer.fullName}</h2>
          <p>
            <strong>Email:</strong> {trainer.email}
          </p>
          <p>
            <strong>Age:</strong> {trainer.age}
          </p>
          <p>
            <strong>Experience:</strong> {trainer.experience} years
          </p>
          <p>
            <strong>Biography:</strong> {trainer.biography}
          </p>
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
          <p>
            <strong>Available Time:</strong>
          </p>
          <div className="flex gap-2 mt-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleBooking(time)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Parallax
        blur={1}
        bgImage="/Personal-Trainer.jpg"
        bgImageAlt="the cat"
        strength={200}
      >
        <section className="py-6 rounded-2xl bg-cover mt-12 ">
          <div className="container   mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
            <h1 className="text-5xl text-accent font-bold leading-none text-center">
              Become A Trainer
            </h1>
            <p className="pt-2 text-white bg-opacity-55 rounded-2xl bg-slate-700 pb-8 text-xl font-medium text-center">
              "Transforming lives isn't just about building stronger bodies—it's
              about inspiring confidence, resilience, and a mindset that says,
              'I can conquer anything.' As a fitness trainer, you're not just
              shaping muscles; you're shaping futures." 💪✨
            </p>
            <Link to="/beatrainer">
              <button className="pr-6 pl-8 flex justify-center items-center py-3 text-lg font-semibold rounded dark:bg-accent dark:text-white">
                Join Now !<MdNavigateNext />
              </button>
            </Link>
          </div>
        </section>
      </Parallax>
    </section>
  );
};

export default TrainerDetails;
