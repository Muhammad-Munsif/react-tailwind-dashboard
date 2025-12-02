// Navbar.jsx
import React from "react";
import { Menu, User } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex items-center z-30 transition-all duration-300 lg:left-64">
      <button
        aria-label="Toggle sidebar"
        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800 ml-4">Dashboard</h1>

      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm hidden md:block">Welcome, Alex</span>
        </div>
      </div>
    </header>
  );
}
