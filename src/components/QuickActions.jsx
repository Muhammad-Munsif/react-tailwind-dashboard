// // src/components/dashboard/QuickActions.jsx
// import React from 'react';
// import { Plus, Upload, Download, Printer, QrCode, Bell } from 'lucide-react';

// const QuickActions = () => {
//   const actions = [
//     { icon: Plus, label: 'Add Asset', color: 'bg-blue-500', path: '/assets/add' },
//     { icon: Upload, label: 'Bulk Upload', color: 'bg-green-500', path: '/assets/upload' },
//     { icon: Download, label: 'Export Report', color: 'bg-purple-500', path: '/reports' },
//     { icon: Printer, label: 'Print Labels', color: 'bg-orange-500', path: '/assets/print' },
//     { icon: QrCode, label: 'Generate QR', color: 'bg-indigo-500', path: '/assets/qr' },
//     { icon: Bell, label: 'Set Alert', color: 'bg-red-500', path: '/settings/alerts' },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {actions.map((action, index) => (
//           <button
//             key={index}
//             className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
//               <action.icon className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-sm font-medium text-gray-700">{action.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuickActions;