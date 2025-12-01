import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Clock,
  Folder,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";

export default function SubCategories({ categories }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Store subcategories by category ID to preserve data
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});

  // Edit state
  const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState("");

  const dropdownRef = useRef();

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get subcategories for the currently selected category
  const currentSubcategories = selected
    ? subcategoriesByCategory[selected.id] || []
    : [];

  // Filter subcategories based on search term
  const filteredSubcategories = currentSubcategories.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category) => {
    setSelected(category);
    setSelectedTime(currentTime);
    setOpen(false);
    setQuery("");
    setNewSubcategory("");
    setSearchTerm(""); // Reset search when switching categories
    setEditingSubcategoryId(null); // Reset editing when switching categories
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() && selected) {
      const newSub = {
        id: Date.now(), // Use timestamp for unique ID
        name: newSubcategory,
        parentCategory: selected.name,
        parentCategoryId: selected.id,
        created: new Date().toISOString().split("T")[0],
        createdTime: currentTime,
      };

      // Update subcategories for the specific category
      setSubcategoriesByCategory((prev) => ({
        ...prev,
        [selected.id]: [...(prev[selected.id] || []), newSub],
      }));

      setNewSubcategory("");
    }
  };

  const handleDeleteSubcategory = (id) => {
    if (selected) {
      setSubcategoriesByCategory((prev) => ({
        ...prev,
        [selected.id]: (prev[selected.id] || []).filter((sub) => sub.id !== id),
      }));
    }
  };

  // Edit subcategory functions
  const startEditingSubcategory = (subcategory) => {
    setEditingSubcategoryId(subcategory.id);
    setEditSubcategoryName(subcategory.name);
  };

  const saveEditSubcategory = () => {
    if (editSubcategoryName.trim() && selected && editingSubcategoryId) {
      setSubcategoriesByCategory((prev) => ({
        ...prev,
        [selected.id]: (prev[selected.id] || []).map((sub) =>
          sub.id === editingSubcategoryId
            ? { ...sub, name: editSubcategoryName }
            : sub
        ),
      }));
      setEditingSubcategoryId(null);
      setEditSubcategoryName("");
    }
  };

  const cancelEditSubcategory = () => {
    setEditingSubcategoryId(null);
    setEditSubcategoryName("");
  };

  // Handle Enter key in edit mode
  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEditSubcategory();
    } else if (e.key === "Escape") {
      cancelEditSubcategory();
    }
  };

  // Get total subcategories count for all categories
  const totalSubcategoriesCount = Object.values(subcategoriesByCategory).reduce(
    (total, subs) => total + subs.length,
    0
  );

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          Sub Categories
          {totalSubcategoriesCount > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({totalSubcategoriesCount} total subcategories)
            </span>
          )}
        </h2>

        {/* Current Time Display */}
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-gray-600 font-medium">Current Time:</span>
          <span className="text-blue-600 font-semibold">{currentTime}</span>
        </div>
      </div>

      {/* Category Selection and Search - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category for Subcategories
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <div className="flex items-center space-x-2">
                {selected && <Folder className="w-4 h-4 text-gray-500" />}
                <span className={selected ? "text-gray-800" : "text-gray-500"}>
                  {selected ? selected.name : "Select category..."}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {selected && currentSubcategories.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {currentSubcategories.length}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {open && (
              <div className="absolute left-0 right-0 bg-white shadow-lg border border-gray-200 rounded-lg mt-1 z-30 max-h-60 overflow-hidden">
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      autoFocus
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Search categories..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>

                <ul className="max-h-48 overflow-y-auto">
                  {filtered.map((category) => {
                    const categorySubs =
                      subcategoriesByCategory[category.id] || [];
                    return (
                      <li
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Folder className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-800">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {category.id} • Created: {category.created}
                              </div>
                            </div>
                          </div>
                          {categorySubs.length > 0 && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {categorySubs.length} sub
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}

                  {filtered.length === 0 && (
                    <li className="p-4 text-gray-500 text-center">
                      No categories found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Search Subcategories Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Subcategories
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subcategories..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!selected}
            />
            {!selected && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg cursor-not-allowed"></div>
            )}
          </div>
          {selected && searchTerm && (
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredSubcategories.length} of{" "}
              {currentSubcategories.length} subcategories
            </p>
          )}
        </div>
      </div>

      {/* Selected Category Details */}
      {selected ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Subcategories for "{selected.name}"
            {currentSubcategories.length > 0 && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({currentSubcategories.length} subcategories)
              </span>
            )}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Information */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <Folder className="w-5 h-5" />
                  <span>Category Information</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-medium bg-blue-100 px-2 py-1 rounded">
                      {selected.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-blue-600">
                      {selected.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Created Date:</span>
                    <span className="font-medium">{selected.created}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Selected Time:</span>
                    <span className="font-medium text-green-600 flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedTime}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subcategories:</span>
                    <span className="font-medium text-purple-600">
                      {currentSubcategories.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subcategories Management Section */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-3">
                Add Subcategory to "{selected.name}"
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Enter subcategory name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddSubcategory()
                  }
                />
                <button
                  onClick={handleAddSubcategory}
                  disabled={!newSubcategory.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Subcategory</span>
                </button>
              </div>

              {/* Subcategories List */}
              {currentSubcategories.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h5 className="font-medium text-gray-700">
                      Subcategories ({filteredSubcategories.length})
                    </h5>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-blue-500 hover:text-blue-700 text-sm flex items-center space-x-1"
                      >
                        <X className="w-3 h-3" />
                        <span>Clear search</span>
                      </button>
                    )}
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredSubcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          {editingSubcategoryId === subcategory.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={editSubcategoryName}
                                onChange={(e) =>
                                  setEditSubcategoryName(e.target.value)
                                }
                                onKeyPress={handleEditKeyPress}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                autoFocus
                              />
                              <div className="flex space-x-1">
                                <button
                                  onClick={saveEditSubcategory}
                                  disabled={!editSubcategoryName.trim()}
                                  className="text-green-600 hover:text-green-800 p-1 disabled:text-gray-400"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={cancelEditSubcategory}
                                  className="text-gray-600 hover:text-gray-800 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-medium text-gray-800">
                                {subcategory.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Created: {subcategory.created} at{" "}
                                {subcategory.createdTime}
                              </div>
                            </div>
                          )}
                        </div>
                        {editingSubcategoryId !== subcategory.id && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() =>
                                startEditingSubcategory(subcategory)
                              }
                              className="text-blue-500 hover:text-blue-700 p-1"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSubcategory(subcategory.id)
                              }
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredSubcategories.length === 0 && searchTerm && (
                      <div className="text-center py-6 text-gray-400">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No subcategories found for "{searchTerm}"</p>
                        <button
                          onClick={() => setSearchTerm("")}
                          className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                        >
                          Clear search
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  <Folder className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No subcategories added yet</p>
                  <p className="text-sm mt-1">
                    Add your first subcategory above
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Folder className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No Category Selected
          </h3>
          <p className="text-gray-500">
            Please select a category from the dropdown above to view and manage
            its subcategories.
          </p>
        </div>
      )}
    </section>
  );
}
