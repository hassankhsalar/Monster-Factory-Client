import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/Shared/SocialLogin";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { createuser, updateUserProfile } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors when typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.photoURL.trim()) {
      newErrors.photoURL = "Photo URL is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Create user with default'user'
      createuser(formData.email, formData.password).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(formData.name, formData.photoURL)
          .then(() => {
            const userInfo = {
              name: formData.name,
              email: formData.email,
              imageURL: formData.photoURL,
              role: "member",
            };
            //create user entrydb
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("user profile info updated");
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your profile has been updated",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((error) => console.log(error));
      });

      setSuccessMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        photoURL: "",
      }); // Reset form
    }
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
      <Helmet>
        <title>MF|Register</title>
      </Helmet>
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-50">
          <span className="block mb-2 dark:text-violet-600">
            Monster Factory
          </span>
          <h1 className="text-5xl font-extrabold dark:text-gray-900">
            Register
          </h1>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="self-stretch space-y-3"
          >
            <div className="mt-6">
              <label htmlFor="name" className="text-sm sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full py-4 rounded-md focus:ring focus:dark:ring-violet-600 dark:border-gray-300 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full py-4 rounded-md focus:ring focus:dark:ring-violet-600 dark:border-gray-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-sm sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full py-4 rounded-md focus:ring focus:dark:ring-violet-600 dark:border-gray-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full py-4 rounded-md focus:ring focus:dark:ring-violet-600 dark:border-gray-300 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <label htmlFor="photoURL" className="text-sm sr-only">
                Photo URL
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="text"
                placeholder="Photo URL"
                value={formData.photoURL}
                onChange={handleChange}
                className={`w-full py-4 rounded-md focus:ring focus:dark:ring-violet-600 dark:border-gray-300 ${
                  errors.photoURL ? "border-red-500" : ""
                }`}
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm">{errors.photoURL}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Register
            </button>
          </form>
          {successMessage && (
            <p className="text-green-600 mt-4 text-lg">{successMessage}</p>
          )}

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <SocialLogin></SocialLogin>
        </div>
        <img
          src="https://i.ibb.co/37Pp4Mb/Chris-Bumstead-Shirtless-Hands-On-Hip.jpg"
          alt="Trainer"
          className="object-cover w-full h-full rounded-md xl:col-span-3 dark:bg-gray-500"
        />
      </div>
    </section>
  );
};

export default Register;
