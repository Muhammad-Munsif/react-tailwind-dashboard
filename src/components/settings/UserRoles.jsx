// src/components/settings/UserRoles.jsx
import React, { useState } from "react";
import { Shield, User, Settings, Eye, Edit, Trash2, Plus } from "lucide-react";

const UserRoles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full system access and control",
      users: 2,
      permissions: ["All Permissions"],
      icon: Shield,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 2,
      name: "Manager",
      description: "Can manage assets and employees",
      users: 5,
      permissions: ["Add/Edit Assets", "Issue/Return Assets", "View Reports"],
      icon: Settings,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      name: "IT Support",
      description: "Technical support and maintenance",
      users: 8,
      permissions: ["Maintenance", "Asset Management", "View Assets"],
      icon: Settings,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      name: "Employee",
      description: "View assigned assets only",
      users: 150,
      permissions: ["View Assigned Assets", "Request Assets"],
      icon: User,
      color: "bg-gray-100 text-gray-600",
    },
  ]);

  const allPermissions = [
    "View Dashboard",
    "Add Assets",
    "Edit Assets",
    "Delete Assets",
    "Issue Assets",
    "Return Assets",
    "View Reports",
    "Export Data",
    "Manage Users",
    "Manage Settings",
    "Approve Requests",
    "Maintenance Access",
  ];

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  const handlePermissionToggle = (permission) => {
    setRoleForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id ? { ...role, ...roleForm } : role
        )
      );
    } else {
      // Add new role
      const newRole = {
        id: roles.length + 1,
        ...roleForm,
        users: 0,
        icon: User,
        color: "bg-purple-100 text-purple-600",
      };
      setRoles([...roles, newRole]);
    }
    setShowRoleModal(false);
    setRoleForm({ name: "", description: "", permissions: [] });
    setSelectedRole(null);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setRoleForm({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setShowRoleModal(true);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== roleId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            User Roles & Permissions
          </h2>
          <p className="text-gray-600">
            Manage access levels and permissions for different users
          </p>
        </div>
        <button
          onClick={() => setShowRoleModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 ${
                    role.color.split(" ")[0]
                  } rounded-lg flex items-center justify-center mr-4`}
                >
                  <role.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {role.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                {role.name !== "Admin" && (
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Users with this role:</span>
                  <span className="font-medium">{role.users} users</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Permissions:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedRole ? "Edit Role" : "Add New Role"}
                </h3>
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedRole(null);
                    setRoleForm({ name: "", description: "", permissions: [] });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    value={roleForm.name}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., IT Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={roleForm.description}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the role and responsibilities..."
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">
                    Permissions
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allPermissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={roleForm.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedRole(null);
                    setRoleForm({ name: "", description: "", permissions: [] });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRole}
                  disabled={!roleForm.name}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedRole ? "Update Role" : "Create Role"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoles;
