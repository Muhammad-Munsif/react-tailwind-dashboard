import React, { useState, useEffect } from "react";
import { FolderPlus, Edit2, Trash2, Package, X, Save } from "lucide-react";

const CategoryManagement = () => {
  // Load categories from localStorage on initial render
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem("inventoryCategories");
      if (savedCategories) {
        return JSON.parse(savedCategories);
      }
    } catch (error) {
      console.error("Error loading categories from localStorage:", error);
    }
    
    // Default categories if nothing in localStorage
    return [
      { id: 1, name: "Laptops", count: 45, color: "bg-blue-100 text-blue-800" },
      { id: 2, name: "Monitors", count: 32, color: "bg-green-100 text-green-800" },
      { id: 3, name: "Keyboards", count: 78, color: "bg-purple-100 text-purple-800" },
      { id: 4, name: "Mice", count: 65, color: "bg-yellow-100 text-yellow-800" },
      { id: 5, name: "Servers", count: 12, color: "bg-red-100 text-red-800" },
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Color options for new categories
  const colorOptions = [
    { bg: "bg-blue-100", text: "text-blue-800", label: "Blue" },
    { bg: "bg-green-100", text: "text-green-800", label: "Green" },
    { bg: "bg-purple-100", text: "text-purple-800", label: "Purple" },
    { bg: "bg-yellow-100", text: "text-yellow-800", label: "Yellow" },
    { bg: "bg-red-100", text: "text-red-800", label: "Red" },
    { bg: "bg-indigo-100", text: "text-indigo-800", label: "Indigo" },
    { bg: "bg-pink-100", text: "text-pink-800", label: "Pink" },
    { bg: "bg-gray-100", text: "text-gray-800", label: "Gray" },
  ];

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  // Save to localStorage whenever categories change
  useEffect(() => {
    try {
      localStorage.setItem("inventoryCategories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error saving categories to localStorage:", error);
    }
  }, [categories]);

  // Generate unique ID
  const generateId = () => {
    return Date.now();
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: generateId(),
        name: newCategory.trim(),
        count: 0,
        color: `${selectedColor.bg} ${selectedColor.text}`,
      };
      
      setCategories([...categories, newCat]);
      setNewCategory("");
      setSelectedColor(colorOptions[0]);
      setShowAddModal(false);
    }
  };

  // Start editing a category
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    
    // Extract color from existing category
    const currentColor = colorOptions.find(opt => 
      category.color.includes(opt.bg.split('-')[1]) // Extract color name from class
    ) || colorOptions[0];
    
    setSelectedColor(currentColor);
    setShowEditModal(true);
  };

  // Save edited category
  const handleSaveEdit = () => {
    if (editName.trim() && editingCategory) {
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { 
              ...cat, 
              name: editName.trim(),
              color: `${selectedColor.bg} ${selectedColor.text}`
            }
          : cat
      );
      
      setCategories(updatedCategories);
      setShowEditModal(false);
      setEditingCategory(null);
      setEditName("");
    }
  };

  // Delete category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setDeleteConfirm(null);
  };

  // Clear all data (for testing)
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all categories? This cannot be undone.")) {
      localStorage.removeItem("inventoryCategories");
      setCategories([]);
    }
  };

  // Reset to default categories
  const handleResetData = () => {
    if (window.confirm("Reset to default categories? Current data will be replaced.")) {
      const defaultCategories = [
        { id: 1, name: "Laptops", count: 45, color: "bg-blue-100 text-blue-800" },
        { id: 2, name: "Monitors", count: 32, color: "bg-green-100 text-green-800" },
        { id: 3, name: "Keyboards", count: 78, color: "bg-purple-100 text-purple-800" },
        { id: 4, name: "Mice", count: 65, color: "bg-yellow-100 text-yellow-800" },
        { id: 5, name: "Servers", count: 12, color: "bg-red-100 text-red-800" },
      ];
      setCategories(defaultCategories);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
          <p className="text-gray-600 mt-1">
            {categories.length} categories • {categories.reduce((sum, cat) => sum + cat.count, 0)} total assets
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleClearData}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Clear All Data
          </button>
          <button
            onClick={handleResetData}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Reset to Default
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Category</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Headphones, Printers"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.label}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 rounded-lg ${color.bg} ${color.text} flex flex-col items-center justify-center ${
                        selectedColor.label === color.label ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span className="text-xs mt-1">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategory.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Category</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.label}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 rounded-lg ${color.bg} ${color.text} flex flex-col items-center justify-center ${
                        selectedColor.label === color.label ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span className="text-xs mt-1">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <button
                  onClick={() => {
                    if (window.confirm("Delete this category?")) {
                      handleDeleteCategory(editingCategory.id);
                      setShowEditModal(false);
                    }
                  }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editName.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete Category</h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-medium">{deleteConfirm.name}</p>
              <p className="text-sm text-gray-600">{deleteConfirm.count} assets in this category</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCategory(deleteConfirm.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first category.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Create First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(category)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                  <p className="text-sm text-gray-600">assets</p>
                </div>
                
                <div className="text-xs text-gray-500">
                  ID: {category.id}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    const updated = categories.map(cat =>
                      cat.id === category.id 
                        ? { ...cat, count: cat.count + 1 }
                        : cat
                    );
                    setCategories(updated);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  + Add Asset
                </button>
                <span className="mx-2 text-gray-300">•</span>
                <button
                  onClick={() => {
                    const updated = categories.map(cat =>
                      cat.id === category.id && cat.count > 0
                        ? { ...cat, count: cat.count - 1 }
                        : cat
                    );
                    setCategories(updated);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  - Remove Asset
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Storage Info Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Data Storage Info:</p>
            <p>Categories are saved in your browser's localStorage.</p>
            <p className="text-xs mt-1">Data will persist even after page refresh.</p>
          </div>
          
          <div className="text-sm">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(categories, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                const exportFileDefaultName = 'categories-backup.json';
                
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center"
            >
              Export Data (JSON)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;








// import React, { useState } from "react";
// import { FolderPlus, Edit2, Trash2, Package } from "lucide-react";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: "Laptops", count: 45, color: "bg-blue-100 text-blue-800" },
//     {
//       id: 2,
//       name: "Monitors",
//       count: 32,
//       color: "bg-green-100 text-green-800",
//     },
//     {
//       id: 3,
//       name: "Keyboards",
//       count: 78,
//       color: "bg-purple-100 text-purple-800",
//     },
//     { id: 4, name: "Mice", count: 65, color: "bg-yellow-100 text-yellow-800" },
//     { id: 5, name: "Servers", count: 12, color: "bg-red-100 text-red-800" },
//   ]);

//   const [showAdd, setShowAdd] = useState(false);
//   const [newCategory, setNewCategory] = useState("");

//   const handleAdd = () => {
//     if (newCategory.trim()) {
//       const newCat = {
//         id: categories.length + 1,
//         name: newCategory.trim(),
//         count: 0,
//         color: "bg-gray-100 text-gray-800",
//       };
//       setCategories([...categories, newCat]);
//       setNewCategory("");
//       setShowAdd(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Category Management</h1>
//         <button
//           onClick={() => setShowAdd(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
//         >
//           <FolderPlus className="w-4 h-4 mr-2" />
//           Add Category
//         </button>
//       </div>

//       {/* Add Category Modal */}
//       {showAdd && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md">
//             <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 placeholder="Enter category name"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 autoFocus
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowAdd(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAdd}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Categories Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <div
//             key={category.id}
//             className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`p-3 rounded-lg ${category.color}`}>
//                 <Package className="w-6 h-6" />
//               </div>
//               <div className="flex space-x-2">
//                 <button className="p-1 hover:bg-gray-100 rounded">
//                   <Edit2 className="w-4 h-4 text-gray-600" />
//                 </button>
//                 <button className="p-1 hover:bg-gray-100 rounded">
//                   <Trash2 className="w-4 h-4 text-red-600" />
//                 </button>
//               </div>
//             </div>
//             <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
//             <p className="text-2xl font-bold">{category.count} assets</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryManagement;




