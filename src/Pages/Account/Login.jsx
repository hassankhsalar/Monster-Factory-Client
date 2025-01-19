import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors when typing
  };

  const validateForm = () => {
    const newErrors = {};
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      signIn(formData.email, formData.password).then((result) => {
        const user = result.user;
        console.log(user);
      });
      setSuccessMessage("Login successful!");
      setFormData({ email: "", password: "" }); // Reset form
      console.log(formData);
      Swal.fire({
        title: "Logged in successfully!",
        icon: "success",
        draggable: true,
      });
      navigate(from, {replace: true });
    }
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
      <Helmet>
        <title>MF|Login</title>
      </Helmet>
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-50">
          <span className="block mb-2 dark:text-violet-600">
            Monster Factory
          </span>
          <h1 className="text-5xl font-extrabold dark:text-gray-900">Login</h1>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="self-stretch space-y-3"
          >
            <div className="mt-6">
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
            <button
              type="submit"
              className="w-full py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Login
            </button>
          </form>
          {successMessage && (
            <p className="text-green-600 mt-4 text-lg">{successMessage}</p>
          )}
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

export default Login;
