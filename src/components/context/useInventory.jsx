// src/context/InventoryContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { assetAPI, employeeAPI, issueAPI } from "../services/api";

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  // Assets State
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [assetCategories, setAssetCategories] = useState([]);
  const [assetBrands, setAssetBrands] = useState([]);

  // Employees State
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  // Issues State
  const [issues, setIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(false);

  // Vendors State
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);

  // Maintenance State
  const [maintenanceTickets, setMaintenanceTickets] = useState([]);
  const [loadingMaintenance, setLoadingMaintenance] = useState(false);

  // Dashboard Stats
  const [dashboardStats, setDashboardStats] = useState({
    totalAssets: 0,
    totalIssued: 0,
    assetsInStock: 0,
    damagedAssets: 0,
    lowStockItems: 0,
    upcomingWarranty: 0,
  });

  // Fetch all assets
  const fetchAssets = useCallback(async (params = {}) => {
    setLoadingAssets(true);
    try {
      // In real app: const data = await assetAPI.getAll(params);
      const mockAssets = [
        {
          id: 1,
          name: "Dell Latitude 5490",
          category: "Laptop",
          brand: "Dell",
          model: "Latitude 5490",
          serialNumber: "DL5490-12345",
          purchaseDate: "2023-01-15",
          supplier: "Dell Technologies",
          warrantyStart: "2023-01-15",
          warrantyEnd: "2025-01-15",
          price: 1299.99,
          status: "Available",
          condition: "Excellent",
          location: "IT Department",
          notes: "16GB RAM, 512GB SSD",
          qrCode: "asset-001",
          createdAt: "2023-01-15T10:30:00Z",
        },
        // Add more mock assets as needed
      ];
      setAssets(mockAssets);
      return mockAssets;
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    } finally {
      setLoadingAssets(false);
    }
  }, []);

  // Add new asset
  const addAsset = async (assetData) => {
    try {
      // In real app: const newAsset = await assetAPI.create(assetData);
      const newAsset = {
        id: Date.now(),
        ...assetData,
        createdAt: new Date().toISOString(),
      };
      setAssets((prev) => [newAsset, ...prev]);
      return newAsset;
    } catch (error) {
      console.error("Error adding asset:", error);
      throw error;
    }
  };

  // Update asset
  const updateAsset = async (id, assetData) => {
    try {
      // In real app: const updatedAsset = await assetAPI.update(id, assetData);
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === id ? { ...asset, ...assetData } : asset
        )
      );
      return { id, ...assetData };
    } catch (error) {
      console.error("Error updating asset:", error);
      throw error;
    }
  };

  // Delete asset
  const deleteAsset = async (id) => {
    try {
      // In real app: await assetAPI.delete(id);
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting asset:", error);
      throw error;
    }
  };

  // Fetch employees
  const fetchEmployees = useCallback(async (params = {}) => {
    setLoadingEmployees(true);
    try {
      // Mock employees data
      const mockEmployees = [
        {
          id: 1,
          employeeId: "EMP001",
          name: "John Doe",
          email: "john.doe@company.com",
          phone: "+1234567890",
          department: "IT",
          designation: "Senior Developer",
          joinDate: "2022-01-15",
          status: "Active",
          assetsAssigned: 3,
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
        },
        // Add more mock employees
      ];
      setEmployees(mockEmployees);
      return mockEmployees;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    } finally {
      setLoadingEmployees(false);
    }
  }, []);

  // Add employee
  const addEmployee = async (employeeData) => {
    try {
      const newEmployee = {
        id: Date.now(),
        employeeId: `EMP${String(Date.now()).slice(-4)}`,
        ...employeeData,
        assetsAssigned: 0,
        avatar: `https://ui-avatars.com/api/?name=${employeeData.name}&background=random`,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      return newEmployee;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  };

  // Issue asset to employee
  const issueAsset = async (issueData) => {
    try {
      const newIssue = {
        id: Date.now(),
        ...issueData,
        issueDate: new Date().toISOString(),
        status: "Active",
        issuedBy: "Current User",
      };

      // Update asset status
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === issueData.assetId
            ? { ...asset, status: "Issued" }
            : asset
        )
      );

      setIssues((prev) => [newIssue, ...prev]);
      return newIssue;
    } catch (error) {
      console.error("Error issuing asset:", error);
      throw error;
    }
  };

  // Return asset
  const returnAsset = async (issueId, condition) => {
    try {
      const issue = issues.find((i) => i.id === issueId);
      if (!issue) throw new Error("Issue not found");

      const newStatus = condition === "Good" ? "Available" : "Damaged";

      // Update asset status
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === issue.assetId
            ? { ...asset, status: newStatus, condition }
            : asset
        )
      );

      // Update issue
      setIssues((prev) =>
        prev.map((i) =>
          i.id === issueId
            ? {
                ...i,
                returnDate: new Date().toISOString(),
                returnCondition: condition,
                status: "Returned",
              }
            : i
        )
      );

      return true;
    } catch (error) {
      console.error("Error returning asset:", error);
      throw error;
    }
  };

  // Fetch dashboard statistics
  const fetchDashboardStats = useCallback(async () => {
    try {
      const totalAssets = assets.length;
      const totalIssued = assets.filter((a) => a.status === "Issued").length;
      const assetsInStock = assets.filter(
        (a) => a.status === "Available"
      ).length;
      const damagedAssets = assets.filter((a) => a.status === "Damaged").length;

      // Calculate low stock items
      const lowStockItems = 5; // Mock value

      // Calculate upcoming warranty expiry
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const upcomingWarranty = assets.filter((asset) => {
        const warrantyEnd = new Date(asset.warrantyEnd);
        return warrantyEnd > today && warrantyEnd <= nextMonth;
      }).length;

      const stats = {
        totalAssets,
        totalIssued,
        assetsInStock,
        damagedAssets,
        lowStockItems,
        upcomingWarranty,
      };

      setDashboardStats(stats);
      return stats;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  }, [assets]);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      await fetchAssets();
      await fetchEmployees();
      await fetchDashboardStats();
    };
    initializeData();
  }, [fetchAssets, fetchEmployees, fetchDashboardStats]);

  const value = {
    // Assets
    assets,
    loadingAssets,
    fetchAssets,
    addAsset,
    updateAsset,
    deleteAsset,
    assetCategories,
    assetBrands,

    // Employees
    employees,
    loadingEmployees,
    fetchEmployees,
    addEmployee,

    // Issues
    issues,
    loadingIssues,
    issueAsset,
    returnAsset,

    // Vendors
    vendors,
    loadingVendors,

    // Maintenance
    maintenanceTickets,
    loadingMaintenance,

    // Dashboard
    dashboardStats,
    fetchDashboardStats,

    // Helper functions
    getAssetById: (id) => assets.find((asset) => asset.id === id),
    getEmployeeById: (id) => employees.find((emp) => emp.id === id),
    getIssuesByEmployee: (employeeId) =>
      issues.filter((issue) => issue.employeeId === employeeId),
    getAssetsByStatus: (status) =>
      assets.filter((asset) => asset.status === status),
    getAssetsByCategory: (category) =>
      assets.filter((asset) => asset.category === category),
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
