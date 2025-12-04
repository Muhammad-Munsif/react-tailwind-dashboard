import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  Phone,
  Building,
  Briefcase,
  User,
  X,
  Save,
  Calendar,
  DollarSign,
} from "lucide-react";

const AddEmployee = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
    hireDate: "",
    salary: "",
    status: "Active",
  });

  const departments = [
    "IT Department",
    "Human Resources",
    "Finance & Accounting",
    "Sales & Marketing",
    "Operations",
    "Research & Development",
    "Customer Support",
    "Administration",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee added:", formData);

    // If onSave prop is provided, call it
    if (onSave) {
      onSave(formData);
    }

    // Clear form and close modal
    setFormData({
      name: "",
      employeeId: "",
      department: "",
      designation: "",
      email: "",
      phone: "",
      hireDate: "",
      salary: "",
      status: "Active",
    });
    onClose();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData({
      name: "",
      employeeId: "",
      department: "",
      designation: "",
      email: "",
      phone: "",
      hireDate: "",
      salary: "",
      status: "Active",
    });
    onClose();
  };

  const handleModalClick = (e) => {
    // Prevent clicks inside modal from closing it
    e.stopPropagation();
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop, not the modal
    if (e.target === e.currentTarget) {
      handleCancel(e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Employee
                </h2>
                <p className="text-sm text-gray-600">
                  Fill in the employee details below
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Employee ID */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeId: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="EMP-001"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="john.doe@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Employment Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Employment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Department */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Designation */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hire Date */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Hire Date
                  </label>
                  <input
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) =>
                      setFormData({ ...formData, hireDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="number"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({ ...formData, salary: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer Actions - MOVED INSIDE FORM */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Save className="w-4 h-4" />
                <span> Employee</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
