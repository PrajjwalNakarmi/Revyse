import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function AdminJobs() {
  const [sources, setSources] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH SOURCES (SAFE)
  const fetchSources = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found");
        return;
      }

      const res = await fetch("http://localhost:5000/api/job-sources", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("API Error:", res.status);
        return;
      }

      const data = await res.json();

      // Prevent crash
      if (!Array.isArray(data)) {
        console.warn("Invalid response:", data);
        return;
      }

      setSources(data);

    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  // ADD SOURCE (SAFE)
  const addSource = async () => {
    if (!name || !url) {
      alert("Enter name and API URL");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      const res = await fetch("http://localhost:5000/api/job-sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          api_url: url,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add source");
        return;
      }

      setName("");
      setUrl("");
      fetchSources();

    } catch (error) {
      console.error("Add failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE SOURCE (SAFE)
  const deleteSource = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await fetch(`http://localhost:5000/api/job-sources/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchSources();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="grid h-full content-start gap-6">

      {/* HEADER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Job Source Management
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Add or remove job APIs used in the system
        </p>
      </div>

      {/* ADD SOURCE */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Source Name (e.g. RemoteOK)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm"
          />

          <button
            onClick={addSource}
            className="flex items-center justify-center gap-2 bg-[#1f5d66] text-white rounded-lg px-4 py-2 text-sm hover:bg-[#15424b]"
          >
            <FaPlus /> {loading ? "Adding..." : "Add Source"}
          </button>

        </div>
      </div>

      {/* LIST SOURCES */}
      <div className="grid md:grid-cols-2 gap-4">

        {(!Array.isArray(sources) || sources.length === 0) && (
          <div className="text-sm text-slate-500">
            No job sources added yet.
          </div>
        )}

        {Array.isArray(sources) &&
          sources.map((source) => (
            <div
              key={source._id}
              className="rounded-xl border border-slate-200 bg-white p-4 flex justify-between items-center"
            >

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {source.name}
                </p>

                <p className="text-xs text-slate-500 break-all">
                  {source.api_url}
                </p>

                <p className="text-xs mt-1 text-green-600">
                  {source.active ? "Active" : "Inactive"}
                </p>
              </div>

              <button
                onClick={() => deleteSource(source._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>

            </div>
          ))}

      </div>

    </div>
  );
}