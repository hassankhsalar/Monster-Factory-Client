import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CommunityForums = () => {
    const [forums, setForums] = useState([]);
   const  axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await axiosSecure.get("/forums");
        console.log(res.data);
        setForums(res.data);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };

    fetchForums();
  }, [axiosSecure]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Community Forums</h1>
      <div className="space-y-6">
        {forums.map((forum) => (
          <div
            key={forum._id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-bold">{forum.title}</h2>
            <img
              src={forum.imageURL}
              alt={forum.title}
              className="w-full h-64 object-cover rounded my-4"
            />
            <p>{forum.description}</p>
            <div className="mt-4 flex items-center">
              <img
                src={forum.createdBy.photoURL}
                alt={forum.createdBy.displayName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{forum.createdBy.displayName}</p>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    forum.createdBy.role === "Admin"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {forum.createdBy.role === "Admin" ? "Admin" : "Trainer"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForums;