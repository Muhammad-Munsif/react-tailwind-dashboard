// import React, { useState, useEffect } from "react";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Categories from "./components/Categories";
// import SubCategories from "./components/SubCategories";

// export default function App() {
//   // Sidebar open by default on both mobile and desktop
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeSection, setActiveSection] = useState("categories");

//   const [categories, setCategories] = useState([
//     { id: 1, name: "Electronics", created: "2025-01-01" },
//     { id: 2, name: "Furniture", created: "2025-01-05" },
//     { id: 3, name: "Fashion", created: "2025-02-01" },
//     { id: 4, name: "Books", created: "2025-03-10" },
//   ]);

//   const addCategory = (newCategory) => {
//     const category = {
//       id: categories.length + 1,
//       name: newCategory,
//       created: new Date().toISOString().split("T")[0],
//     };
//     setCategories([...categories, category]);
//   };

//   const editCategory = (id, newName) => {
//     setCategories(
//       categories.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
//     );
//   };

//   const deleteCategory = (id) => {
//     setCategories(categories.filter((cat) => cat.id !== id));
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "categories":
//         return (
//           <Categories
//             categories={categories}
//             onAddCategory={addCategory}
//             onEditCategory={editCategory}
//             onDeleteCategory={deleteCategory}
//           />
//         );
//       case "subcategories":
//         return <SubCategories categories={categories} />;
//       default:
//         return (
//           <Categories
//             categories={categories}
//             onAddCategory={addCategory}
//             onEditCategory={editCategory}
//             onDeleteCategory={deleteCategory}
//           />
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden mt-16">
//       {/* Sidebar */}
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       {/* Main content */}
//       <div
//         className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
//           sidebarOpen ? "md:ml-64" : ""
//         }`}
//       >
//         <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="flex-1 pt-16 p-4 md:p-6 overflow-y-auto">
//           <div className="max-w-7xl mx-auto">{renderContent()}</div>
//         </main>
//       </div>
//     </div>
//   );
// }



// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import AssetList from "./components/assets/AssetList";
import Login from "./components/auth/Login";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Reports from './components/Reports';
import AddEmployee from './components/AddEmployee';
import CategoryManagement from "./components/CategoryManagemant";
// import AssetManagement from "./components/AssetManagemant";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Fixed Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64">
          {/* Fixed Navbar */}
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto pt-16">
            <div className="p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/category" element={<CategoryManagement />} />
                {/* <Route path="/asset" element={<AssetManagement />} /> */}
                <Route path="/assets" element={<AssetList />} />
                <Route path="/employees" element={<AddEmployee />} />
                <Route path="/reports" element={<Reports />} />
                <Route
                  path="/settings"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Settings</h1>
                    </div>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;