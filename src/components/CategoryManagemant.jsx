import React, { useState } from "react";
import { FolderPlus, Edit2, Trash2, Package } from "lucide-react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Laptops", count: 45, color: "bg-blue-100 text-blue-800" },
    {
      id: 2,
      name: "Monitors",
      count: 32,
      color: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Keyboards",
      count: 78,
      color: "bg-purple-100 text-purple-800",
    },
    { id: 4, name: "Mice", count: 65, color: "bg-yellow-100 text-yellow-800" },
    { id: 5, name: "Servers", count: 12, color: "bg-red-100 text-red-800" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategory.trim(),
        count: 0,
        color: "bg-gray-100 text-gray-800",
      };
      setCategories([...categories, newCat]);
      setNewCategory("");
      setShowAdd(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Add Category Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border rounded-lg"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${category.color}`}>
                <Package className="w-6 h-6" />
              </div>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-2xl font-bold">{category.count} assets</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
