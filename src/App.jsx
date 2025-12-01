import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import SubCategories from "./components/SubCategories";

export default function App() {
  // Sidebar open by default on both mobile and desktop
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("categories");

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", created: "2025-01-01" },
    { id: 2, name: "Furniture", created: "2025-01-05" },
    { id: 3, name: "Fashion", created: "2025-02-01" },
    { id: 4, name: "Books", created: "2025-03-10" },
  ]);

  const addCategory = (newCategory) => {
    const category = {
      id: categories.length + 1,
      name: newCategory,
      created: new Date().toISOString().split('T')[0]
    };
    setCategories([...categories, category]);
  };

  const editCategory = (id, newName) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, name: newName } : cat
    ));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "categories":
        return (
          <Categories 
            categories={categories} 
            onAddCategory={addCategory} 
            onEditCategory={editCategory}
            onDeleteCategory={deleteCategory} 
          />
        );
      case "subcategories":
        return <SubCategories categories={categories} />;
      default:
        return (
          <Categories 
            categories={categories} 
            onAddCategory={addCategory} 
            onEditCategory={editCategory}
            onDeleteCategory={deleteCategory} 
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden mt-16">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 pt-16 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}