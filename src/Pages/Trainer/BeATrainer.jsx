import React, { useContext, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const daysOptions = [
  { value: "sun", label: "Sunday" },
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
];

const timeSlotOptions = [
  { value: "10:00am-11:59am", label: "10:00 AM - 11:59 AM" },
  { value: "2:00pm-4:00pm", label: "2:00 PM - 4:00 PM" },
  { value: "8:00pm-10:00pm", label: "8:00 PM - 10:00 PM" },
];

const BeATrainer = () => {
  const { user } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email, // Replace with user email from context
    age: "",
    imageURL: "",
    skills: [],
    availableDays: [],
    availableTime: "",
    experience: "",
    biography: "",
    status: "pending",
    role: "member",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSlotChange = (selectedOption) => {
    setFormData({ ...formData, availableTime: selectedOption?.value || "" });
  };

  const handleDaysChange = (selectedOptions) => {
    const selectedDays = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, availableDays: selectedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://y-nine-azure.vercel.app/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Application submitted successfully!");
        Swal.fire({
          title: "Done!",
          icon: "success",
          draggable: true,
        });
        setFormData({
          fullName: "",
          email: user?.email,
          age: "",
          imageURL: "",
          skills: [],
          availableDays: [],
          availableTime: "",
          experience: "",
          biography: "",
        });
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-slate-700 text-gray-800">
      <Helmet>
        <title>MF || Become Trainer</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-accent">Be A Trainer</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div className="dark:text-slate-400">
          <label htmlFor="fullName" className="block mb-2 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Enter your full name"
            required
          />
        </div>
        {user ? (
          <div className="dark:text-slate-400">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full p-3 border rounded bg-gray-200 cursor-not-allowed"
            />
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className="dark:text-slate-400">
          <label htmlFor="age" className="block mb-2 font-semibold">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Enter your age"
            required
          />
        </div>
        {/* temporary image url function */}
        <div className="dark:text-slate-400">
          <label htmlFor="fullName" className="block mb-2 font-semibold">
            Image URL
          </label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="provide Image Url"
            required
          />
        </div>

        {/* image function to be added later */}
        {/* <div>
          <label htmlFor="profileImage" className="block mb-2 font-semibold">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={(e) =>
              setFormData({ ...formData, profileImage: e.target.files[0] })
            }
            className="w-full p-3 border rounded"
          />
        </div> */}
        {/* 999999999999999999999999999999999999 */}

        <div className="dark:text-slate-400">
          <label htmlFor="experience" className="block mb-2 font-semibold">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="experience in years"
            required
          />
        </div>
        <div className="dark:text-slate-400">
          <label htmlFor="skills" className="block mb-2 font-semibold">
            Skills
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Strength Training"
                onChange={(e) => {
                  const newSkills = formData.skills.includes(e.target.value)
                    ? formData.skills.filter(
                        (skill) => skill !== e.target.value
                      )
                    : [...formData.skills, e.target.value];
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              Strength Training
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Cardio"
                onChange={(e) => {
                  const newSkills = formData.skills.includes(e.target.value)
                    ? formData.skills.filter(
                        (skill) => skill !== e.target.value
                      )
                    : [...formData.skills, e.target.value];
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              Cardio
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Nutrition"
                onChange={(e) => {
                  const newSkills = formData.skills.includes(e.target.value)
                    ? formData.skills.filter(
                        (skill) => skill !== e.target.value
                      )
                    : [...formData.skills, e.target.value];
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              Nutrition
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Yoga"
                onChange={(e) => {
                  const newSkills = formData.skills.includes(e.target.value)
                    ? formData.skills.filter(
                        (skill) => skill !== e.target.value
                      )
                    : [...formData.skills, e.target.value];
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              Yoga
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Fitness"
                onChange={(e) => {
                  const newSkills = formData.skills.includes(e.target.value)
                    ? formData.skills.filter(
                        (skill) => skill !== e.target.value
                      )
                    : [...formData.skills, e.target.value];
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              Fitness
            </label>
          </div>
        </div>
        <div className="dark:text-slate-400">
          <label htmlFor="availableDays" className="block mb-2 font-semibold">
            Available Days
          </label>
          <Select
            id="availableDays"
            isMulti
            options={daysOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleDaysChange}
            placeholder="Select available days"
          />
        </div>
        <div className="dark:text-slate-400">
          <label htmlFor="availableTime" className="block mb-2 font-semibold">
            Available Time
          </label>
          <Select
            id="availableTime"
            options={timeSlotOptions}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleTimeSlotChange}
            placeholder="Select a time slot"
          />
        </div>
        <div className="dark:text-slate-400">
          <label htmlFor="biography" className="block mb-2 font-semibold">
            Biography
          </label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Any additional information"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>
    </section>
  );
};

export default BeATrainer;
