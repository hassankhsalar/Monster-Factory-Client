import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddNewForum = () => {
  const { user } = useAuth();
  const [users, ,] = useUser();
  const thisUser = users.find((u) => u.email === user.email);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    imageURL: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForum = {
      ...formData,
      createdBy: {
        email: user.email,
        displayName: user.displayName,
        role: thisUser.role,
        photoURL: user.photoURL,
      },
      createdAt: new Date(),
    };

    try {
      const response = await axiosSecure.post("/forums", newForum);
      if (response.data.insertedId) {
        setMessage("Forum added successfully!");
        setFormData({ title: "", imageURL: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding forum:", error);
      setMessage("Failed to add forum. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>MF || Add forum</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Add a New Forum</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Forum
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AddNewForum;
