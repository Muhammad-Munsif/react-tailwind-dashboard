import React, { useState } from 'react';
import { Calendar, User, MessageSquare, Send } from 'lucide-react';

const IssueAsset = ({ asset, onClose }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    issueDate: new Date().toISOString().split('T')[0],
    expectedReturn: '',
    comments: ''
  });

  const employees = [
    { id: 'EMP001', name: 'John Doe', department: 'IT' },
    { id: 'EMP002', name: 'Jane Smith', department: 'HR' },
    { id: 'EMP003', name: 'Bob Johnson', department: 'Finance' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Asset issued:', { asset, ...formData });
    // API call here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Issue Asset</h2>
          <p className="text-gray-600 mt-1">{asset?.name} - {asset?.serial}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Employee Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Select Employee
            </label>
            <select
              value={formData.employeeId}
              onChange={(e) => {
                const selected = employees.find(emp => emp.id === e.target.value);
                setFormData({
                  ...formData,
                  employeeId: e.target.value,
                  employeeName: selected?.name || ''
                });
              }}
              required
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
              ))}
            </select>
          </div>

          {/* Issue Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Issue Date
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Expected Return */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Expected Return Date
            </label>
            <input
              type="date"
              value={formData.expectedReturn}
              onChange={(e) => setFormData({...formData, expectedReturn: e.target.value})}
              min={formData.issueDate}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 mr-2" />
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Issue Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueAsset;