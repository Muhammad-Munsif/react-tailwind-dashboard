// src/components/common/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  debounceDelay = 300,
  className = "",
  showClearButton = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceDelay, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative flex items-center ${
          isFocused ? "ring-2 ring-blue-500 ring-offset-2" : ""
        } rounded-lg transition-all`}
      >
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search
            className={`w-5 h-5 ${
              isFocused ? "text-blue-500" : "text-gray-400"
            }`}
          />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />

        {showClearButton && searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {searchTerm && (
        <div className="absolute top-full mt-1 text-xs text-gray-500">
          Press Enter to search
        </div>
      )}
    </div>
  );
};

export default SearchBar;
