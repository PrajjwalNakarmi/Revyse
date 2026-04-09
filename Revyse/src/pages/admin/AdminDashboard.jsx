import {
  FaUsers,
  FaFileAlt,
  FaBriefcase,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-purple-300">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-sm">
          Monitor system performance and user activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Users */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-gray-400 text-sm">Total Users</h2>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>
          <FaUsers className="text-purple-400 text-2xl" />
        </div>

        {/* CV */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-gray-400 text-sm">CV Uploaded</h2>
            <p className="text-2xl font-bold mt-2">85</p>
          </div>
          <FaFileAlt className="text-purple-400 text-2xl" />
        </div>

        {/* Jobs */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-gray-400 text-sm">Jobs Fetched</h2>
            <p className="text-2xl font-bold mt-2">340</p>
          </div>
          <FaBriefcase className="text-purple-400 text-2xl" />
        </div>

        {/* Errors */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-gray-400 text-sm">System Errors</h2>
            <p className="text-2xl font-bold mt-2 text-red-400">5</p>
          </div>
          <FaExclamationTriangle className="text-red-400 text-2xl" />
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4 text-purple-300">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>User uploaded CV</li>
            <li>OCR processed successfully</li>
            <li>Jobs fetched from API</li>
            <li>Error in job matching</li>
          </ul>
        </div>

        {/* System Status */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4 text-purple-300">
            System Status
          </h2>

          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>OCR Service</span>
              <span className="text-green-400">Active</span>
            </div>

            <div className="flex justify-between">
              <span>Job API</span>
              <span className="text-green-400">Running</span>
            </div>

            <div className="flex justify-between">
              <span>AI Engine</span>
              <span className="text-green-400">Operational</span>
            </div>

            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-400">Connected</span>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-purple-300">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
            Refresh Jobs
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
            Clear Logs
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
            Manage Users
          </button>
        </div>
      </div>

    </div>
  );
}