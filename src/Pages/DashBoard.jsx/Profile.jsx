import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setProfilePic(user.photoURL || "");
      setLastLogin(user.metadata.lastSignInTime || "N/A");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Update Firebase profile
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: profilePic,
        });

        // Update MongoDB
        const updatedData = {
          name,
          profilePic,
        };
        await axiosSecure.put(`/users/${currentUser.email}`, updatedData);

        Swal.fire({
          title: "Profile updated successfully!",
          icon: "success",
          draggable: true,
        });
      } else {
        alert("No authenticated user found!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container w-full mx-auto p-6">
      <Helmet>
        <title>MF || Profile</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Manage Your Profile</h1>
      <div className="flex flex-col md:flex-row justify-evenly items-center">
        <div>
          <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
            <img
              src={user.photoURL}
              alt=""
              className="w-32 h-32 mx-auto rounded-full bg-gray-500 dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700 dark:divide-gray-300">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {user.displayName}
                </h2>
                <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                  {user.email}
                </p>
                <div className="mb-4">
                  <label className="block font-medium mb-2 dark:text-gray-600">Last Login</label>
                  <p className="dark:text-gray-600">{lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-secondary p-6 rounded shadow-md w-full max-w-md"
          >
            <div className="mb-4">
              <label className="block text-white font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-medium mb-2" htmlFor="profilePic">
                Profile Picture URL
              </label>
              <input
                type="text"
                id="profilePic"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-4 py-2 rounded text-white ${
                  isUpdating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-accent hover:bg-blue-600"
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
