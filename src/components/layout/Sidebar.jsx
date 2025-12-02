// import React from "react";
// import { X, LayoutGrid, FolderTree, LayoutDashboard } from "lucide-react";

// export default function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   activeSection,
//   setActiveSection,
// }) {
//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "categories", label: "Categories", icon: LayoutGrid },
//     { id: "subcategories", label: "Sub-Categories", icon: FolderTree },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 pt-20 z-40 transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <nav className="space-y-2">
//           {menuItems.map((item) => {
//             const IconComponent = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActiveSection(item.id);
//                   // Close sidebar on mobile only
//                   if (window.innerWidth < 768) {
//                     setSidebarOpen(false);
//                   }
//                 }}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                   activeSection === item.id
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                 }`}
//               >
//                 <IconComponent className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         {/* Close button for mobile only */}
//         <button
//           className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <X className="w-6 h-6" />
//         </button>
//       </aside>
//     </>
//   );
// }

// import React, { useState } from "react";
// import {
//   Home,
//   Package,
//   Users,
//   BarChart3,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard", icon: Home },
//     { path: "/assets", label: "Assets", icon: Package },
//     { path: "/employees", label: "Employees", icon: Users },
//     { path: "/reports", label: "Reports", icon: BarChart3 },
//     { path: "/settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//         ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0 fixed top-0 lg:static inset-y-0 left-0 z-40
//         w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out
//       `}
//       >
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-800">
//           <h1 className="text-xl font-bold">Inventory Pro</h1>
//           <p className="text-gray-400 text-sm">Management System</p>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
//                 className={`
//                   flex items-center px-4 py-3 rounded-lg transition-colors
//                   ${
//                     isActive
//                       ? "bg-blue-600 text-white"
//                       : "hover:bg-gray-800 text-gray-300"
//                   }
//                 `}
//               >
//                 <Icon className="w-5 h-5 mr-3" />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User Info */}
//         <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
//           <div className="flex items-center mb-4">
//             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//               <span className="font-bold">AD</span>
//             </div>
//             <div className="ml-3">
//               <p className="font-medium">Admin User</p>
//               <p className="text-sm text-gray-400">Administrator</p>
//             </div>
//           </div>
//           <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg">
//             <LogOut className="w-5 h-5 mr-3" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
import React, { useState } from "react";
import {
  Home,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  List,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/category", label: "CategoryManagement", icon: List },
    { path: "/assets", label: "Assets", icon: Package },
    { path: "/employees", label: "Employees", icon: Users },
    { path: "/addasset", label: "AddAsset", icon: Users },
    { path: "/reports", label: "Reports", icon: BarChart3 },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40
          transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Inventory Pro</h1>
          <p className="text-gray-400 text-sm">Management System</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() =>
                  window.innerWidth < 1024 && setSidebarOpen(false)
                }
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="font-bold">AD</span>
            </div>
            <div className="ml-3">
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-400">Administrator</p>
            </div>
          </div>
          <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>

        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-300 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
