import Navbar from "../components/Navbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div className="p-10 text-center">No user data found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Top banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />

          {/* Content */}
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

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-semibold text-gray-800">
                  {user.name || user.fullName}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-semibold text-gray-800">{user.email}</p>
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
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                disabled
              >
                Edit Profile (Coming Soon)
              </button>

              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                disabled
              >
                Change Password (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
