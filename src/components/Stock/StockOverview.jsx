// src/components/stock/StockOverview.jsx
import React from 'react';
import { Package, CheckCircle, AlertTriangle, Wrench, TrendingUp } from 'lucide-react';

const StockOverview = () => {
  const stockData = {
    inStock: 328,
    issued: 892,
    damaged: 25,
    underRepair: 18,
    lowStockItems: 7,
    totalCategories: 15,
  };

  const lowStockItems = [
    { id: 1, name: 'Ethernet Cables', current: 5, threshold: 10 },
    { id: 2, name: 'HDMI Cables', current: 8, threshold: 15 },
    { id: 3, name: 'SFP Modules', current: 3, threshold: 10 },
    { id: 4, name: 'Thermal Paste', current: 2, threshold: 5 },
  ];

  const categories = [
    { name: 'Laptops', count: 245, percentage: 40 },
    { name: 'Monitors', count: 153, percentage: 25 },
    { name: 'Accessories', count: 122, percentage: 20 },
    { name: 'Networking', count: 92, percentage: 15 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stock Overview</h1>
        <p className="text-gray-600">Monitor your inventory levels and stock status</p>
      </div>

      {/* Stock Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Stock</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stockData.inStock}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5% from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issued</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stockData.issued}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-4">Currently in use</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Damaged</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stockData.damaged}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-4">Needs attention</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Repair</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stockData.underRepair}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-4">In maintenance</div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            {lowStockItems.length} items
          </span>
        </div>
        <div className="space-y-4">
          {lowStockItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Threshold: {item.threshold}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-red-600">{item.current}</p>
                <p className="text-sm text-gray-600">remaining</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
          View All Alerts
        </button>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Distribution</h3>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{category.name}</span>
                <span className="font-medium">{category.count} items</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockOverview;