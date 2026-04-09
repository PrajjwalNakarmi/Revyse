import { FaExclamationTriangle } from "react-icons/fa";

export default function AdminLogs() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-purple-300">
        System Logs
      </h1>

      <div className="bg-white/10 p-4 rounded-xl space-y-3">

        <div className="flex justify-between border-b border-white/10 pb-2 text-gray-400">
          <span>Time</span>
          <span>Message</span>
          <span>Status</span>
        </div>

        <div className="flex justify-between">
          <span>10:45 AM</span>
          <span className="flex items-center gap-2">
            <FaExclamationTriangle /> Job API error
          </span>
          <span className="text-red-400">Error</span>
        </div>

      </div>

    </div>
  );
}