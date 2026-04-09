import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 text-white">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Navbar */}
        <div className="bg-white/10 backdrop-blur-lg p-4 flex justify-between items-center border-b border-white/10">
          <h1 className="text-xl font-semibold text-purple-300">
            Admin Panel
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, Admin</span>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              A
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>

      </div>
    </div>
  );
}