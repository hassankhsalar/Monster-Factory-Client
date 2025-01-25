import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import img from "/Personal-Trainer.jpg";
import { Helmet } from "react-helmet-async";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch enrolled classes
  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const res = await axiosSecure.get(
          `/payments/enrolled?email=${user.email}`
        );
        console.log(res.data);
        setEnrolledClasses(res.data);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      }
    };

    fetchEnrolledClasses();
  }, [axiosSecure, user.email]);

  const handleOpenModal = (classData) => {
    setSelectedClass(classData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setFeedback("");
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = {
        classId: selectedClass._id,
        details: feedback,
        name: user.displayName,
        imageURL: user.photoURL,
      };
      await axiosSecure.post("/reviews", feedbackData);
      alert("Feedback submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>MF || My Classes</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Enrolled Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((enrolledClass) => (
          <div
            key={enrolledClass._id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <img
              src={img}
              alt=""
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">
              {enrolledClass.classTitles}
            </h2>
            <ul>
              {enrolledClass.trainerDetails.map((trainer, index) => (
                <li key={index}>
                  <img src={trainer.imageURL} alt={trainer.fullName} />
                  <span>{trainer.fullName}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleOpenModal(enrolledClass)}
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Review for {selectedClass?.classTitle}
            </h2>
            <form onSubmit={handleSubmitFeedback}>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4"
                rows="5"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledClasses;
