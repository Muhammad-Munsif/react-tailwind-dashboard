// src/components/common/FilterPanel.jsx
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

const FilterPanel = ({
  filters = [],
  onFilterChange,
  initialFilters = {},
  className = "",
  collapsible = false
}) => {
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [isExpanded, setIsExpanded] = useState(!collapsible);

  const handleFilterChange = (filterKey, value) => {
    const newFilters = {
      ...activeFilters,
      [filterKey]: value === 'all' || value === '' ? undefined : value
    };
    setActiveFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {};
    filters.forEach(filter => {
      resetFilters[filter.key] = undefined;
    });
    setActiveFilters(resetFilters);
    if (onFilterChange) onFilterChange(resetFilters);
  };

  const activeFilterCount = Object.values(activeFilters).filter(val => val !== undefined).length;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div 
        className={`flex items-center justify-between p-4 ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Filter className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Filters</h3>
            <p className="text-sm text-gray-500">
              {activeFilterCount > 0 
                ? `${activeFilterCount} active filter${activeFilterCount > 1 ? 's' : ''}`
                : 'No filters applied'
              }
            </p>
          </div>
        </div>
        
        {collapsible && (
          <div className="flex items-center space-x-2">
            {activeFilterCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {filter.label}
                </label>
                {filter.type === 'select' ? (
                  <select
                    value={activeFilters[filter.key] || 'all'}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All {filter.label}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : filter.type === 'date' ? (
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ) : filter.type === 'multi-select' ? (
                  <div className="space-y-2">
                    <select
                      multiple
                      value={activeFilters[filter.key] || []}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange(filter.key, selected);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      size={Math.min(filter.options.length, 5)}
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Active filters pills */}
          {activeFilterCount > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Active Filters</span>
                <button
                  onClick={handleReset}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const value = activeFilters[filter.key];
                  if (value === undefined || value === '') return null;

                  let displayValue = value;
                  if (filter.type === 'select' || filter.type === 'multi-select') {
                    const options = filter.options;
                    if (Array.isArray(value)) {
                      displayValue = value
                        .map(v => options.find(o => o.value === v)?.label || v)
                        .join(', ');
                    } else {
                      displayValue = options.find(o => o.value === value)?.label || value;
                    }
                  }

                  return (
                    <div
                      key={filter.key}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      <span className="font-medium">{filter.label}:</span>
                      <span className="ml-1">{displayValue}</span>
                      <button
                        onClick={() => handleFilterChange(filter.key, undefined)}
                        className="ml-2 p-0.5 hover:bg-blue-100 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;