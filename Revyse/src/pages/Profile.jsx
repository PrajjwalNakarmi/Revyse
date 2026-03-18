import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser?.name || storedUser?.fullName || "",
    email: storedUser?.email || "",
  });

  if (!user) {
    return <div className="p-10 text-center">No user data found</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("All fields are required");
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || user.fullName,
      email: user.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your account information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />

          <div className="p-8 relative">

            {/* Avatar */}
            <div className="absolute -top-12 left-8">
              <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-indigo-600 text-3xl font-bold">
                {user.name?.[0] || user.fullName?.[0] || "U"}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name || user.fullName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>

                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="font-semibold text-gray-800">
                    {user.name || user.fullName}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Email Address</p>

                {isEditing ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="font-semibold text-gray-800">
                    {user.email}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="font-semibold text-gray-800">
                  {user.role || "User"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  Active
                </span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-10">

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>

          </div>
        </div>

      </main>
    </div>
  );
}