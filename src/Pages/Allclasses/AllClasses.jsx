import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, trainersRes] = await Promise.all([
          axios.get("https://y-nine-azure.vercel.app/classes"),
          axios.get("https://y-nine-azure.vercel.app/trainers"),
        ]);

        setClasses(classesRes.data || []);
        setTrainers(trainersRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getMatchingTrainers = (className) => {
    return trainers
      .filter((trainer) => trainer.skills.includes(className))
      .slice(0, 5);
  };

  const totalPages = Math.ceil(classes.length / classesPerPage);
  const displayedClasses = classes.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://y-nine-azure.vercel.app/classes/search?name=${searchQuery}`
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error searching classes:", error);
    }
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-slate-700">
      <Helmet>
        <title>MF || All Classes</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-accent">All Classes</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search classes by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-l-md focus:outline-none dark:bg-slate-900"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedClasses.length > 0 ? (
          displayedClasses.map((classItem) => (
            <div key={classItem._id} className="bg-white dark:bg-slate-900 p-4 rounded shadow">
              <div>
                <img
                  src={classItem.imageURL}
                  alt=""
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 dark:text-slate-400">{classItem.title}</h2>
              <p className="text-gray-700 mb-4 dark:text-slate-500">{classItem.description}</p>
              <h3 className="font-semibold mb-2 dark:text-slate-400">Trainers:</h3>
              <div className="flex items-center space-x-2">
                {getMatchingTrainers(classItem.name).map((trainer) => (
                  <Link
                    to={`/alltrainers/${trainer._id}`}
                    key={trainer._id}
                    state={{
                      classTitle: classItem.title, // Passing the class title
                      trainerId: trainer._id, // Optional additional info
                    }}
                  >
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
