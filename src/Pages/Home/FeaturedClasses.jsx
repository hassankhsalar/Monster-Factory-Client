import { useEffect, useState } from "react";

const FeaturedClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://y-nine-azure.vercel.app/classes"); // Adjust the URL as needed
        const data = await response.json();

        // Sort the classes by totalBookings in descending order and take the top 6
        const sortedClasses = data
          .sort((a, b) => b.totalBookings - a.totalBookings)
          .slice(0, 6);

        setClasses(sortedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div id='featured' className="container mx-auto py-8">
      <h2 className="text-4xl font-bold text-center mb-6">Featured Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="p-4 flex flex-col justify-between bg-white rounded-lg shadow-md dark:bg-secondary"
          >
            <h3 className="text-2xl text-white font-bold mb-2">{cls.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {cls.description}
            </p>
            <p className="font-bold bg-white rounded-md text-center py-2 text-violet-900">
              Total Bookings: {cls.totalBookings}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
