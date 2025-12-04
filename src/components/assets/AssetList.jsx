import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AssetList = () => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [
    "All",
    "Laptop",
    "Desktop",
    "Monitor",
    "Keyboard",
    "Mouse",
  ];
  const statuses = ["All", "Available", "Issued", "Damaged", "Scrapped"];

  const assets = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: `Asset ${i + 1}`,
    category: categories[(i % (categories.length - 1)) + 1],
    brand: ["Dell", "HP", "Lenovo"][i % 3],
    model: `Model-${(i % 10) + 1}`,
    serial: `SN${1000 + i}`,
    status: statuses[(i % (statuses.length - 1)) + 1],
    purchaseDate: `2023-${String(Math.floor(i / 12) + 1).padStart(
      2,
      "0"
    )}-${String((i % 28) + 1).padStart(2, "0")}`,
  }));

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.serial.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !filterCategory ||
      filterCategory === "All" ||
      asset.category === filterCategory;
    const matchesStatus =
      !filterStatus || filterStatus === "All" || asset.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = filteredAssets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Asset Inventory</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Add New Asset
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or serial number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Categories</option>
              {categories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Status</option>
              {statuses
                .filter((s) => s !== "All")
                .map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
            </select>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{asset.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-500">{asset.model}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">
                    {asset.serial}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        asset.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : asset.status === "Issued"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredAssets.length)} of{" "}
            {filteredAssets.length} results
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetList;

// src/components/assets/AssetList.jsx
// import React, { useState } from 'react';
// import {
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   Eye,
//   Download,
//   Plus,
//   QrCode,
//   Smartphone,
//   CheckCircle,
//   XCircle,
//   Wrench
// } from 'lucide-react';
// import DataTable from '../common/DataTable';
// import Modal from '../common/Modal';
// import AssetForm from './AssetForm';

// const AssetList = () => {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     category: '',
//     status: '',
//     brand: ''
//   });

//   const assets = [
//     {
//       id: 1,
//       name: 'Dell Latitude 5490',
//       category: 'Laptop',
//       brand: 'Dell',
//       serial: 'DL5490-12345',
//       purchaseDate: '2023-01-15',
//       warrantyEnd: '2025-01-15',
//       price: '$1,299',
//       status: 'Available',
//       qrCode: true
//     },
//     // ... more assets
//   ];

//   const statusColors = {
//     Available: 'bg-green-100 text-green-800',
//     Issued: 'bg-blue-100 text-blue-800',
//     Damaged: 'bg-red-100 text-red-800',
//     Scrapped: 'bg-gray-100 text-gray-800'
//   };

//   const columns = [
//     {
//       key: 'name',
//       header: 'Asset Name',
//       render: (item) => (
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//             <Smartphone className="w-4 h-4 text-blue-600" />
//           </div>
//           <div>
//             <p className="font-medium">{item.name}</p>
//             <p className="text-xs text-gray-500">{item.serial}</p>
//           </div>
//         </div>
//       )
//     },
//     {
//       key: 'category',
//       header: 'Category'
//     },
//     {
//       key: 'brand',
//       header: 'Brand'
//     },
//     {
//       key: 'purchaseDate',
//       header: 'Purchase Date'
//     },
//     {
//       key: 'warrantyEnd',
//       header: 'Warranty Until'
//     },
//     {
//       key: 'price',
//       header: 'Price'
//     },
//     {
//       key: 'status',
//       header: 'Status',
//       render: (item) => (
//         <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[item.status]}`}>
//           {item.status}
//         </span>
//       )
//     },
//     {
//       key: 'actions',
//       header: 'Actions',
//       render: (item) => (
//         <div className="flex space-x-2">
//           <button className="p-1 hover:bg-gray-100 rounded" title="View">
//             <Eye className="w-4 h-4" />
//           </button>
//           <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
//             <Edit className="w-4 h-4" />
//           </button>
//           {item.qrCode && (
//             <button className="p-1 hover:bg-gray-100 rounded" title="QR Code">
//               <QrCode className="w-4 h-4" />
//             </button>
//           )}
//           <button className="p-1 hover:bg-red-100 rounded text-red-600" title="Delete">
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const categories = ['Laptop', 'Desktop', 'Monitor', 'HDD', 'SSD', 'RAM', 'Keyboard', 'Mouse'];
//   const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer'];
//   const statuses = ['Available', 'Issued', 'Damaged', 'Scrapped'];

//   return (
//     <div className="space-y-6">
//       {/* Header with Actions */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
//           <p className="text-gray-600">Manage and track all company assets</p>
//         </div>
//         <div className="flex space-x-3 mt-4 md:mt-0">
//           <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             <Plus className="w-4 h-4 mr-2" />
//             Add Asset
//           </button>
//           <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Download className="w-4 h-4 mr-2" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-xl shadow p-4">
//         <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//           {/* Search */}
//           <div className="relative flex-1 md:max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search assets by name, serial, or brand..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-2">
//             <select
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={filters.category}
//               onChange={(e) => setFilters({...filters, category: e.target.value})}
//             >
//               <option value="">All Categories</option>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>

//             <select
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={filters.status}
//               onChange={(e) => setFilters({...filters, status: e.target.value})}
//             >
//               <option value="">All Status</option>
//               {statuses.map(status => (
//                 <option key={status} value={status}>{status}</option>
//               ))}
//             </select>

//             <select
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={filters.brand}
//               onChange={(e) => setFilters({...filters, brand: e.target.value})}
//             >
//               <option value="">All Brands</option>
//               {brands.map(brand => (
//                 <option key={brand} value={brand}>{brand}</option>
//               ))}
//             </select>

//             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <Filter className="w-4 h-4 mr-2" />
//               More Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Assets Table */}
//       <DataTable
//         data={assets}
//         columns={columns}
//         itemsPerPage={10}
//         searchable={true}
//         onRowClick={(asset) => setSelectedAsset(asset)}
//       />

//       {/* Add Asset Modal */}
//       <Modal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         title="Add New Asset"
//         size="lg"
//       >
//         <AssetForm onClose={() => setShowAddModal(false)} />
//       </Modal>
//     </div>
//   );
// };

// export default AssetList;
