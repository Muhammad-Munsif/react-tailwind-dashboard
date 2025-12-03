import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  BarChart3,
  Calendar,
  Filter,
  Eye,
} from "lucide-react";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const reports = [
    {
      id: 1,
      title: "Asset Summary Report",
      icon: FileText,
      description: "Overview of all assets",
    },
    {
      id: 2,
      title: "Issued Asset Report",
      icon: BarChart3,
      description: "Currently issued assets",
    },
    {
      id: 3,
      title: "Employee Asset Report",
      icon: FileText,
      description: "Assets per employee",
    },
    {
      id: 4,
      title: "Vendor Purchase Report",
      icon: FileText,
      description: "Purchases by vendor",
    },
    {
      id: 5,
      title: "Warranty Expiry Report",
      icon: Calendar,
      description: "Warranty status",
    },
    {
      id: 6,
      title: "Damaged Asset Report",
      icon: FileText,
      description: "Damaged assets list",
    },
  ];

  const generateReport = (report) => {
    console.log("Generating report:", report.title, "Date range:", dateRange);
    setSelectedReport(report);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">
          Generate and export various inventory reports
        </p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium">Date Range:</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <span className="self-center">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filter
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <button
                onClick={() => generateReport(report)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Report
              </button>
            </div>
          );
        })}
      </div>

      {/* Generated Report Preview */}
      {selectedReport && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{selectedReport.title}</h2>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-gray-500">Report preview will appear here...</p>
            <div className="h-64 flex items-center justify-center">
              <p>Generated report content for {selectedReport.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;


// src/components/reports/Reports.jsx
// import React, { useState } from 'react';
// import { Download, Printer, Filter, Calendar, FileText, PieChart, BarChart } from 'lucide-react';
// import ReportCard from './ReportCard';
// import ExportOptions from './ExportOptions';

// const Reports = () => {
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [dateRange, setDateRange] = useState({
//     start: '',
//     end: '',
//   });

//   const reports = [
//     {
//       id: 1,
//       title: 'Asset Summary Report',
//       description: 'Complete overview of all assets with status and values',
//       icon: PieChart,
//       color: 'bg-blue-500',
//       type: 'summary',
//     },
//     {
//       id: 2,
//       title: 'Issued Asset Report',
//       description: 'Details of all currently issued assets',
//       icon: FileText,
//       color: 'bg-green-500',
//       type: 'issued',
//     },
//     {
//       id: 3,
//       title: 'Employee-wise Asset Report',
//       description: 'Assets assigned to each employee',
//       icon: BarChart,
//       color: 'bg-purple-500',
//       type: 'employee',
//     },
//     {
//       id: 4,
//       title: 'Vendor Purchase Report',
//       description: 'Purchase history from all vendors',
//       icon: FileText,
//       color: 'bg-orange-500',
//       type: 'vendor',
//     },
//     {
//       id: 5,
//       title: 'Warranty Expiry Report',
//       description: 'Assets with expiring warranties',
//       icon: Calendar,
//       color: 'bg-yellow-500',
//       type: 'warranty',
//     },
//     {
//       id: 6,
//       title: 'Damaged Asset Report',
//       description: 'List of damaged and under repair assets',
//       icon: FileText,
//       color: 'bg-red-500',
//       type: 'damaged',
//     },
//   ];

//   const handleGenerateReport = (report) => {
//     setSelectedReport(report);
//     // In real app, this would trigger API call
//     console.log('Generating report:', report.type);
//   };

//   const handleExport = (format) => {
//     console.log(`Exporting ${selectedReport?.type} report as ${format}`);
//     // Handle export logic
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
//           <p className="text-gray-600">Generate and export detailed inventory reports</p>
//         </div>
//         <div className="flex space-x-3 mt-4 md:mt-0">
//           <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Printer className="w-4 h-4 mr-2" />
//             Print
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             <Download className="w-4 h-4 mr-2" />
//             Export All
//           </button>
//         </div>
//       </div>

//       {/* Date Range Filter */}
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//           <div className="flex items-center">
//             <Filter className="w-5 h-5 text-gray-500 mr-2" />
//             <h3 className="font-medium text-gray-900">Filter Reports</h3>
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
//             <div className="flex items-center space-x-2">
//               <Calendar className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-700">Date Range:</span>
//             </div>
//             <div className="flex space-x-2">
//               <input
//                 type="date"
//                 value={dateRange.start}
//                 onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//               <span className="self-center text-gray-500">to</span>
//               <input
//                 type="date"
//                 value={dateRange.end}
//                 onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
//               Apply Filter
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reports Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reports.map((report) => (
//           <ReportCard
//             key={report.id}
//             report={report}
//             onGenerate={() => handleGenerateReport(report)}
//           />
//         ))}
//       </div>

//       {/* Export Options Modal */}
//       {selectedReport && (
//         <ExportOptions
//           isOpen={!!selectedReport}
//           onClose={() => setSelectedReport(null)}
//           reportType={selectedReport.type}
//           onExport={handleExport}
//         />
//       )}
//     </div>
//   );
// };

// export default Reports;