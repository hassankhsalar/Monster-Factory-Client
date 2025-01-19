import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllClasses = () => {
  const [classes, setClasses] = useState([]); // Ensure it's an empty array initially
  const [trainers, setTrainers] = useState([]); // Same for trainers
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, trainersRes] = await Promise.all([
          axios.get("http://localhost:5000/classes"), // Replace with your API endpoint
          axios.get("http://localhost:5000/trainers"), // Replace with your API endpoint
        ]);

        setClasses(classesRes.data || []); // Safeguard against undefined data
        setTrainers(trainersRes.data || []); // Safeguard against undefined data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate the trainers for a specific class
  const getMatchingTrainers = (className) => {
    return trainers.filter((trainer) => trainer.skills.includes(className)).slice(0, 5);
  };

  // Pagination logic
  const totalPages = Math.ceil(classes.length / classesPerPage);
  const displayedClasses = classes.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  return (
    <section className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">All Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedClasses.length > 0 ? (
          displayedClasses.map((classItem) => (
            <div key={classItem._id} className="bg-white p-4 rounded shadow">
                <div><img src={classItem.imageURL} alt="" /></div>
              <h2 className="text-xl font-semibold mb-2">{classItem.name}</h2>
              <p className="text-gray-700 mb-4">{classItem.description}</p>
              <h3 className="font-semibold mb-2">Trainers:</h3>
              <div className="flex items-center space-x-2">
                {getMatchingTrainers(classItem.name).map((trainer) => (
                  <Link to={`/alltrainers/${trainer._id}`} key={trainer._id}>
                    <img
                      src={trainer.imageURL}
                      alt={trainer.name}
                      className="w-10 h-10 rounded-full border hover:scale-110 transition"
                      title={trainer.name}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Loading classes...</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AllClasses;
