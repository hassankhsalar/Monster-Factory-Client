import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AppliedTrainerDetails = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false); 
  const [feedback, setFeedback] = useState(""); 

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
      fetchTrainer(); 
    }
  }, [id, axiosSecure]);

  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/trainers/approved/${id}`, {
        status: "approved",
        role: "trainer",
      });
      alert("Trainer approved successfully!");
      setTrainer((prev) => ({ ...prev, status: "approved", role: "trainer" }));
    } catch (error) {
      console.error("Error approving trainer:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axiosSecure.patch(`/trainers/rejected/${id}`, {
        feedback,
      });
      alert("Trainer rejected successfully!");
      setTrainer((prev) => ({
        ...prev,
        status: "rejected",
        rejectionFeedback: feedback,
      }));
      setShowModal(false);
    } catch (error) {
      console.error("Error rejecting trainer:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!trainer) {
    return <div>No trainer data found.</div>;
  }

  const isApproved = trainer.status === "approved";
  const isRejected = trainer.status === "rejected";

  return (
    <div>
      <Helmet>
              <title>MF || Trainer details</title>
            </Helmet>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>

      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img
          src={trainer.imageURL}
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
              Available Days: {trainer.availableDays?.join(", ")}
            </p>
            <p className="dark:text-gray-800">
              Experience: {trainer.experience} Years
            </p>
            <p className="dark:text-gray-800">
              Available Time: {trainer.availableTime}
            </p>
          </div>

          {/* Approve button */}
          <button
            onClick={handleApprove}
            type="button"
            className={`flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md ${
              isApproved
                ? "dark:bg-green-600 dark:text-gray-50 cursor-not-allowed"
                : "dark:bg-violet-600 dark:text-gray-50"
            }`}
            disabled={isApproved || isRejected}
          >
            {isApproved ? "Approved" : "Approve"}
          </button>

          {/* Reject button */}
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className={`flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md ${
              isRejected
                ? "dark:bg-red-600 dark:text-gray-50 cursor-not-allowed"
                : "dark:bg-red-500 dark:text-gray-50"
            }`}
            disabled={isApproved || isRejected}
          >
            {isRejected ? "Rejected" : "Reject"}
          </button>
        </div>
      </div>

      {/* Modal for rejection feedback */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Rejection Feedback</h2>
            <p className="mb-4">
              Please provide feedback for rejecting {trainer.fullName}.
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              className="w-full border rounded p-2"
              placeholder="Enter feedback..."
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainerDetails;
