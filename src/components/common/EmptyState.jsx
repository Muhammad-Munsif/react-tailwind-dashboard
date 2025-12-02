// src/components/common/EmptyState.jsx
import React from 'react';
import { Package, Search, AlertCircle, Plus, RefreshCw, icon } from 'lucide-react';

const EmptyState = ({
  title,
  description,
  icon = "package",
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  className = ""
}) => {
  const icons = {
    package: Package,
    search: Search,
    alert: AlertCircle,
    add: Plus,
    refresh: RefreshCw
  };

  const IconComponent = icons[icon] || Package;

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 max-w-md mb-6">
          {description}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        {action && actionLabel && (
          <button
            onClick={action}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {icon === 'add' && <Plus className="w-4 h-4 mr-2" />}
            {icon === 'refresh' && <RefreshCw className="w-4 h-4 mr-2" />}
            {actionLabel}
          </button>
        )}
        
        {secondaryAction && secondaryActionLabel && (
          <button
            onClick={secondaryAction}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export const EmptyTableState = ({ 
  title = "No data found", 
  description = "There are no records to display",
  searchQuery = ""
}) => {
  if (searchQuery) {
    return (
      <EmptyState
        title="No results found"
        description={`No data matches your search for "${searchQuery}"`}
        icon="search"
        actionLabel="Clear search"
      />
    );
  }

  return (
    <EmptyState
      title={title}
      description={description}
      icon="package"
      actionLabel="Add new item"
      icon="add"
    />
  );
};

export const EmptySearchResults = ({ searchTerm }) => (
  <div className="py-12 text-center">
    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No results found
    </h3>
    <p className="text-gray-600">
      We couldn't find any results for "{searchTerm}". Try adjusting your search.
    </p>
  </div>
);

export const ErrorState = ({ 
  title = "Something went wrong", 
  description = "We encountered an error while loading the data.",
  retryAction 
}) => (
  <EmptyState
    title={title}
    description={description}
    icon="alert"
    action={retryAction}
    actionLabel="Try again"
    icon="refresh"
  />
);

export default EmptyState;