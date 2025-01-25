import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEye } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const ActivityLog = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const [trainerApplications, setTrainerApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTrainerApplications = async () => {
      try {
        const res = await axiosSecure.get(`/trainers?email=${user.email}`);
        setTrainerApplications(res.data);
      } catch (error) {
        console.error("Error fetching trainer applications:", error);
      }
    };

    fetchTrainerApplications();
  }, [axiosSecure, user.email]);

  const handleOpenModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeedback("");
  };

  useEffect(() => {
    if (user && user.email) {
      // Filter applications by user.email
      const filtered = trainerApplications.filter(
        (application) => application.email === user.email
      );
      setFilteredApplications(filtered);
    }
  }, [trainerApplications, user]);

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>MF || Activity Log</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Trainer Application Status</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Rejection Feedback</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application) => (
            <tr key={application._id}>
              <td className="border-b px-4 py-2">
                {application.status === "pending" && (
                  <span className="text-yellow-500">Pending</span>
                )}
                {application.status === "rejected" && (
                  <span className="text-red-500">Rejected</span>
                )}
              </td>
              <td className="border-b px-4 py-2">
                {application.status === "rejected" && (
                  <button
                    className="text-blue-500 flex justify-center hover:underline"
                    onClick={() =>
                      handleOpenModal(application.rejectionFeedback)
                    }
                  >
                    <FaEye></FaEye> Feedback
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-xl font-semibold mb-4">Rejection Feedback</h2>
            <p className="mb-6">{selectedFeedback}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
