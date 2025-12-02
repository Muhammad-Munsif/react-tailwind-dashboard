// src/components/common/Button.jsx
import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  onClick,
  icon: Icon,
  iconPosition = "left",
  href,
  target,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 active:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
    warning:
      "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200",
    link: "text-blue-600 hover:text-blue-800 underline hover:no-underline focus:ring-blue-500",
  };

  const sizeStyles = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const iconSize = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <Loader2
          className={`${iconSize[size]} animate-spin ${
            iconPosition === "left" ? "mr-2" : "ml-2"
          }`}
        />
      );
    }
    if (Icon && !loading) {
      return (
        <Icon
          className={`${iconSize[size]} ${
            iconPosition === "left" ? "mr-2" : "ml-2"
          }`}
        />
      );
    }
    return null;
  };

  const content = (
    <>
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </>
  );

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
};

// Predefined button components for common use cases
export const IconButton = ({
  icon: Icon,
  size = "md",
  variant = "ghost",
  ...props
}) => (
  <Button
    variant={variant}
    size={size}
    icon={Icon}
    iconPosition="center"
    className="p-2"
    {...props}
  >
    <span className="sr-only">{props["aria-label"] || "Icon button"}</span>
  </Button>
);

export const DeleteButton = ({ loading, ...props }) => (
  <Button variant="danger" icon={Loader2} loading={loading} {...props}>
    {props.children || "Delete"}
  </Button>
);

export const SaveButton = ({ loading, ...props }) => (
  <Button variant="success" icon={Loader2} loading={loading} {...props}>
    {props.children || "Save"}
  </Button>
);

export const AddButton = ({ ...props }) => (
  <Button variant="primary" {...props}>
    {props.children || "Add New"}
  </Button>
);

export default Button;
