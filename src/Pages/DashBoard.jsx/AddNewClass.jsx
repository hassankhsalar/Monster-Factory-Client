import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Select from "react-select";
import { Helmet } from "react-helmet-async";

const skills = [
  { value: "Strength Training", label: "Strength Training" },
  { value: "Cardio", label: "Cardio" },
  { value: "Nutrition", label: "Nutrition" },
  { value: "Yoga", label: "Yoga" },
  { value: "Fitness", label: "Fitness" },
];

const AddNewClass = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    title: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      name: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.title ||
      !formData.imageURL
    ) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axiosSecure.post("/classes", {
        ...formData,
        totalBookings: 0, // Default value
      });
      console.log(response);

      setMessage({ text: "Class added successfully!", type: "success" });
      setFormData({
        name: "",
        description: "",
        title: "",
        imageURL: "",
      });
    } catch (error) {
      setMessage({
        text: "Failed to add the class. Please try again.",
        type: "error",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <Helmet>
        <title>MF || Add Class</title>
      </Helmet>
      <h1 className="text-xl font-bold mb-4">Add New Class</h1>
      {message.text && (
        <p
          className={`mb-4 text-sm ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="skill" className="block mb-2 font-semibold">
            Skill Required
          </label>
          <Select
            id="skill"
            options={skills}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleSkillChange}
            placeholder="Select a skill"
            value={skills.find((skill) => skill.value === formData.name)}
            isClearable
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter class title"
          />
        </div>
        <div>
          <label
            className="block mb-1 text-sm font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter class description"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="imageURL">
            Image URL
          </label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
