import { FaFileAlt } from "react-icons/fa";

export default function AdminCV() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-purple-300">
        CV Management
      </h1>

      <div className="bg-white/10 rounded-xl p-4">

        <div className="flex justify-between border-b border-white/10 pb-2 text-gray-400">
          <span>User</span>
          <span>File</span>
          <span>Status</span>
        </div>

        <div className="flex justify-between py-3">
          <span>John</span>
          <span className="flex items-center gap-2">
            <FaFileAlt /> resume.pdf
          </span>
          <span className="text-green-400">Processed</span>
        </div>

      </div>

    </div>
  );
}