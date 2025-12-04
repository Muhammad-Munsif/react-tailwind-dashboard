// src/components/issue-return/IssueForm.jsx
import React from 'react';
import { Calendar, User, Package, MessageSquare, Clock } from 'lucide-react';

const IssueForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    assetId: '',
    employeeId: '',
    issueDate: new Date().toISOString().split('T')[0],
    expectedReturnDate: '',
    comments: '',
    issuedBy: 'Admin',
  });

  const employees = [
    { id: 1, name: 'John Doe', department: 'IT' },
    { id: 2, name: 'Jane Smith', department: 'HR' },
    { id: 3, name: 'Bob Johnson', department: 'Finance' },
  ];

  const availableAssets = [
    { id: 'A1001', name: 'Dell Latitude 5490', category: 'Laptop' },
    { id: 'A1002', name: 'HP EliteBook 840', category: 'Laptop' },
    { id: 'A1003', name: 'Dell 24" Monitor', category: 'Monitor' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Asset *
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Asset</option>
              {availableAssets.map(asset => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({asset.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Employee *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Return Date *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="expectedReturnDate"
              value={formData.expectedReturnDate}
              onChange={handleChange}
              min={formData.issueDate}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Issued By
        </label>
        <input
          type="text"
          name="issuedBy"
          value={formData.issuedBy}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comments
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional comments or notes..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Issue Asset
        </button>
      </div>
    </form>
  );
};

export default IssueForm;