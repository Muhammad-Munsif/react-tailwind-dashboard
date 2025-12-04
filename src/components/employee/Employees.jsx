// Employees.jsx
import React, { useState, useEffect } from "react";
import { Users, Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import AddEmployeeModal from "./AddEmployee"; // Import the modal component

const Employees = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      // Default employees if none in localStorage
      setEmployees([
        {
          id: 1,
          name: "John Doe",
          email: "john@company.com",
          department: "IT",
          designation: "Software Engineer",
          status: "Active",
          employeeId: "EMP001",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@company.com",
          department: "HR",
          designation: "HR Manager",
          status: "Active",
          employeeId: "EMP002",
        },
        {
          id: 3,
          name: "Robert Johnson",
          email: "robert@company.com",
          department: "Finance",
          designation: "Financial Analyst",
          status: "Active",
          employeeId: "EMP003",
        },
      ]);
    }
  }, []);

  // Save employees to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleSaveEmployee = (newEmployee) => {
    // Generate a unique ID
    const newEmployeeWithId = {
      ...newEmployee,
      id:
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1,
      employeeId: `EMP${String(employees.length + 1).padStart(3, "0")}`,
    };

    // Add to employees list
    const updatedEmployees = [...employees, newEmployeeWithId];
    setEmployees(updatedEmployees);

    // Close modal
    setShowAddModal(false);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter((emp) => emp.id !== id);
      setEmployees(updatedEmployees);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.employeeId &&
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Users className="w-7 h-7 mr-3 text-blue-600" />
              Employees
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your organization's employees
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filter
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No employees found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try a different search term"
                : "Get started by adding your first employee"}
            </p>
            {!searchTerm && (
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Employee
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-6 text-left text-sm font-semibold text-gray-700">
                    Employee ID
                  </th>
                  <th className="py-3.5 px-6 text-left text-sm font-semibold text-gray-700">
                    Employee
                  </th>
                  <th className="py-3.5 px-6 text-left text-sm font-semibold text-gray-700">
                    Department
                  </th>
                  <th className="py-3.5 px-6 text-left text-sm font-semibold text-gray-700">
                    Designation
                  </th>
                  <th className="py-3.5 px-6 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3.5 px-6 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">
                      {employee.employeeId ||
                        `EMP${String(employee.id).padStart(3, "0")}`}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-800">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {employee.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {employee.department}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {employee.designation}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={() =>
                            console.log("Edit employee:", employee.id)
                          }
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Employee Modal - CONDITIONAL RENDERING */}
      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  );
};

export default Employees;
