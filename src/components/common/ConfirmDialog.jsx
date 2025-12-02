// src/components/common/ConfirmDialog.jsx
import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info, X } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false
}) => {
  if (!isOpen) return null;

  const variants = {
    warning: {
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    danger: {
      icon: XCircle,
      iconColor: "text-red-500",
      bgColor: "bg-red-100",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
    success: {
      icon: CheckCircle,
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    }
  };

  const { icon: Icon, iconColor, bgColor, buttonColor } = variants[variant];

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
          <div className="p-6">
            <div className="flex items-start">
              <div className={`flex-shrink-0 p-3 ${bgColor} rounded-lg`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              
              <div className="ml-4 flex-1">
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                )}
                
                {message && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{message}</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={onClose}
                className="ml-3 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cancelText}
              </button>
              
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${buttonColor}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;