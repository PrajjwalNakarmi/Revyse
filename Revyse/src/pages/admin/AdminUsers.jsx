import { FaTrash, FaSearch } from "react-icons/fa";

export default function AdminUsers() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-purple-300">
        User Management
      </h1>

      {/* Search */}
      <div className="flex items-center bg-white/10 p-2 rounded-lg">
        <FaSearch className="text-gray-400 mx-2" />
        <input
          type="text"
          placeholder="Search users..."
          className="bg-transparent outline-none text-white w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-white/10 rounded-xl p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-white/10">
              <td>John Doe</td>
              <td>john@test.com</td>
              <td>User</td>
              <td>
                <button className="text-red-400 hover:text-red-600">
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
}