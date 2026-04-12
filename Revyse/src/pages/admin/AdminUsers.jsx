import { useEffect, useMemo, useState } from "react";
import { FaTrash, FaSearch, FaUserPlus, FaEdit, FaTimes, FaEye } from "react-icons/fa";
import {
  fetchAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../../services/adminService";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@test.com", role: "User" },
  { id: 2, name: "Maya Lee", email: "maya@test.com", role: "User" },
  { id: 3, name: "Sarah Kim", email: "sarah@test.com", role: "Admin" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "User" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeUser = (user) => ({
    id: user.id || user._id,
    name: user.name,
    email: user.email,
    role: user.role === "admin" ? "Admin" : "User",
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminUsers();
      const mapped = data.map(normalizeUser);
      setUsers(mapped);
      if (!selectedUserId && mapped.length) {
        setSelectedUserId(mapped[0].id);
      }
    } catch (err) {
      setError(err.message || "Failed to load users");
      setUsers(initialUsers);
      if (!selectedUserId) {
        setSelectedUserId(initialUsers[0]?.id ?? null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }, [users, search]);

  const openAddForm = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "User" });
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUserId(user.id);
    setSelectedUserId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsFormOpen(true);
  };

  const openViewUser = (user) => {
    setSelectedUserId(user.id);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUserId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email) return;

    try {
      setError("");
      if (editingUserId) {
        const updated = await updateAdminUser(editingUserId, {
          name,
          email,
          role: formData.role.toLowerCase(),
        });
        const normalized = normalizeUser(updated);
        setUsers((prev) => prev.map((user) => (user.id === editingUserId ? normalized : user)));
      } else {
        const created = await createAdminUser({
          name,
          email,
          role: formData.role.toLowerCase(),
        });
        const normalized = normalizeUser(created);
        setUsers((prev) => [normalized, ...prev]);
        setSelectedUserId(normalized.id);
      }
      closeForm();
    } catch (err) {
      setError(err.message || "Failed to save user");
    }
  };

  const handleRemove = async (id) => {
    try {
      setError("");
      await deleteAdminUser(id);
      setUsers((prev) => {
        const updatedUsers = prev.filter((user) => user.id !== id);
        if (selectedUserId === id) {
          setSelectedUserId(updatedUsers[0]?.id ?? null);
        }
        return updatedUsers;
      });
    } catch (err) {
      setError(err.message || "Failed to remove user");
    }
  };

  const activeAccounts = users.length;
  const adminCount = users.filter((user) => user.role === "Admin").length;
  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  return (
    <div className="grid h-full content-start gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-teal-700">User management</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage users</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Search, add, edit, and remove account roles from one place.</p>
          </div>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6b5a]"
          >
            <FaUserPlus /> Add user
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="grid min-h-0 gap-4 xl:grid-cols-[1fr_0.6fr]">
        <div className="min-h-0 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <FaSearch className="text-slate-500" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mt-4 max-h-[50vh] overflow-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="sticky top-0 bg-slate-100 text-slate-500">
                <tr>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-4 text-slate-500" colSpan={4}>Loading users...</td>
                  </tr>
                )}
                {!loading && filteredUsers.length === 0 && (
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-4 text-slate-500" colSpan={4}>No users found.</td>
                  </tr>
                )}
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-medium text-slate-900">{user.name}</td>
                    <td className="px-4 py-4 text-slate-600">{user.email}</td>
                    <td className="px-4 py-4 text-slate-600">{user.role}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewUser(user)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-teal-300 bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                        >
                          <FaEye /> View
                        </button>
                        <button
                          onClick={() => openEditForm(user)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleRemove(user.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Summary</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Active accounts</p>
              <p className="mt-2 text-slate-600">{activeAccounts} total users currently active.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Admin roles</p>
              <p className="mt-2 text-slate-600">{adminCount} users have administrator access.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Filtered users</p>
              <p className="mt-2 text-slate-600">{filteredUsers.length} users match your current search.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">User details</p>
              {selectedUser ? (
                <div className="mt-2 space-y-1.5 text-slate-600">
                  <p><span className="font-medium text-slate-800">Name:</span> {selectedUser.name}</p>
                  <p><span className="font-medium text-slate-800">Email:</span> {selectedUser.email}</p>
                  <p><span className="font-medium text-slate-800">Role:</span> {selectedUser.role}</p>
                  <p><span className="font-medium text-slate-800">User ID:</span> #{selectedUser.id}</p>
                </div>
              ) : (
                <p className="mt-2 text-slate-600">No user selected. Click View on any user.</p>
              )}
            </div>
          </div>

          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{editingUserId ? "Edit user" : "Add user"}</p>
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-md p-1 text-slate-500 transition hover:bg-slate-200"
                  aria-label="Close form"
                >
                  <FaTimes className="h-3.5 w-3.5" />
                </button>
              </div>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Full name"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500"
                required
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email address"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500"
                required
              />

              <select
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6b5a]"
              >
                {editingUserId ? "Save Changes" : "Create User"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
