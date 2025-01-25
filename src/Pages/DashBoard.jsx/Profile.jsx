import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
            draggable: true
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Your Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="name">
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
          <label className="block font-medium mb-2" htmlFor="profilePic">
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
          <label className="block font-medium mb-2" htmlFor="email">
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
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Last Login
          </label>
          <p className="text-gray-700">{lastLogin}</p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
