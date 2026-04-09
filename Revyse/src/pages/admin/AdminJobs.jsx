import { FaSync } from "react-icons/fa";

export default function AdminJobs() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-purple-300">
        Job API Management
      </h1>

      <div className="bg-white/10 p-4 rounded-xl space-y-4">

        <div className="flex justify-between">
          <span>LinkedIn API</span>
          <span className="text-green-400">Active</span>
        </div>

        <div className="flex justify-between">
          <span>RemoteOK API</span>
          <span className="text-green-400">Active</span>
        </div>

        <button className="bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <FaSync /> Refresh Jobs
        </button>

      </div>

    </div>
  );
}