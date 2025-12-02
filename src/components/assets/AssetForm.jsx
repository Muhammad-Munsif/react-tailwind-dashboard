// src/components/assets/AssetForm.jsx
import React, { useState } from "react";
import { Save, X, Upload, Camera, QrCode } from "lucide-react";

const AssetForm = ({ asset, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: asset?.name || "",
    category: asset?.category || "",
    brand: asset?.brand || "",
    model: asset?.model || "",
    serialNumber: asset?.serial || "",
    purchaseDate: asset?.purchaseDate || "",
    supplier: asset?.supplier || "",
    warrantyStart: asset?.warrantyStart || "",
    warrantyEnd: asset?.warrantyEnd || "",
    price: asset?.price || "",
    status: asset?.status || "Available",
    notes: asset?.notes || "",
  });

  const categories = [
    "Laptop",
    "Desktop",
    "Monitor",
    "HDD",
    "SSD",
    "RAM",
    "Keyboard",
    "Mouse",
    "Server",
    "Networking Device",
    "Printer",
    "Scanner",
    "Projector",
    "UPS",
  ];

  const brands = [
    "Dell",
    "HP",
    "Lenovo",
    "Apple",
    "Asus",
    "Acer",
    "Cisco",
    "TP-Link",
    "Logitech",
    "Microsoft",
    "Samsung",
  ];

  const statuses = [
    "Available",
    "Issued",
    "Damaged",
    "Scrapped",
    "Under Maintenance",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    onSave?.(formData);
    onClose?.();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="e.g., Dell Latitude 5490 Laptop"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Latitude 5490"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Enter serial number"
              />
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Camera className="w-4 h-4 mr-2" />
                Scan
              </button>
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR
              </button>
            </div>
          </div>
        </div>

        {/* Purchase & Warranty */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Purchase & Warranty
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter supplier name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty Start
              </label>
              <input
                type="date"
                name="warrantyStart"
                value={formData.warrantyStart}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty End
              </label>
              <input
                type="date"
                name="warrantyEnd"
                value={formData.warrantyEnd}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes about the asset..."
            />
          </div>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Attachments
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Drag & drop files here or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Upload invoice, warranty card, or photos (Max 10MB per file)
          </p>
          <input type="file" className="hidden" id="file-upload" multiple />
          <label
            htmlFor="file-upload"
            className="inline-block mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            Browse Files
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {asset ? "Update Asset" : "Save Asset"}
        </button>
      </div>
    </form>
  );
};

export default AssetForm;
