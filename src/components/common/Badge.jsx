// src/components/common/Badge.jsx
import React from 'react';
import { X, Check, AlertCircle, Clock, Ban, Wrench } from 'lucide-react';

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = "full",
  withIcon = false,
  iconPosition = "left",
  onRemove,
  className = "",
  icon: CustomIcon
}) => {
  const baseStyles = "inline-flex items-center font-medium";
  
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-purple-100 text-purple-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-cyan-100 text-cyan-800",
    dark: "bg-gray-800 text-white"
  };
  
  const sizeStyles = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-sm",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };
  
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full"
  };

  const getIcon = () => {
    if (CustomIcon) return <CustomIcon className={`${size === 'xs' || size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1.5`} />;
    
    switch(variant) {
      case 'success': return <Check className={`${size === 'xs' || size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1.5`} />;
      case 'warning': return <AlertCircle className={`${size === 'xs' || size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1.5`} />;
      case 'danger': return <Ban className={`${size === 'xs' || size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1.5`} />;
      default: return null;
    }
  };

  const icon = withIcon ? getIcon() : null;

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]} ${className}`}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 p-0.5 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className={`${size === 'xs' || size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />
        </button>
      )}
    </span>
  );
};

// Predefined badge components for common use cases
export const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: { variant: "success", icon: Check },
    Inactive: { variant: "default" },
    Pending: { variant: "warning", icon: Clock },
    Approved: { variant: "success", icon: Check },
    Rejected: { variant: "danger", icon: Ban },
    Available: { variant: "success", icon: Check },
    Issued: { variant: "primary" },
    Damaged: { variant: "danger", icon: AlertCircle },
    UnderRepair: { variant: "warning", icon: Wrench },
    Scrapped: { variant: "dark" }
  };

  const config = statusConfig[status] || { variant: "default" };

  return (
    <Badge variant={config.variant} withIcon={!!config.icon} icon={config.icon}>
      {status}
    </Badge>
  );
};

export const CategoryBadge = ({ category }) => (
  <Badge variant="secondary">{category}</Badge>
);

export const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    High: { variant: "danger", icon: AlertCircle },
    Medium: { variant: "warning", icon: AlertCircle },
    Low: { variant: "info", icon: AlertCircle }
  };

  const config = priorityConfig[priority] || { variant: "default" };

  return (
    <Badge variant={config.variant} withIcon>
      {priority}
    </Badge>
  );
};

export default Badge;