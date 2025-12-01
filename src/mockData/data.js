const data = {
    // -------------------------------
    // 1. Dashboard
    // -------------------------------
    dashboard: {
      asset : [
        {name: "Total Assets", value: 150},
        {name: "Total Issued", value: 45},
        {name: "Assets In Stock", value: 92},
        {name: "Damaged Assets", value: 13},
        // {name: "Upcoming Warranty Expiry", value: 7},
      ],
      // totalAssets: 150,
      // totalIssued: 45,
      // inStock: 92,
      // damagedAssets: 13,
      // upcomingWarrantyExpiry: 7,
      categoryChart: [
        { category: "Laptop", count: 25 },
        { category: "Desktop", count: 18 },
        { category: "Monitor", count: 30 },
        { category: "Keyboard", count: 22 },
        { category: "Mouse", count: 20 },
        { category: "SSD", count: 15 },
        { category: "RAM", count: 20 }
      ],
      alerts: [
        "3 Laptops warranty expiring this month",
        "Mouse stock is low",
        "2 assets marked as damaged"
      ]
    },
  
    // -------------------------------
    // 2. Assets
    // -------------------------------
    assets: [
      {
        id: 1,
        itemName: "Dell Latitude 5490",
        category: "Laptop",
        brand: "Dell",
        model: "5490",
        serialNumber: "DL-LAP-99821",
        purchaseDate: "2023-02-11",
        supplier: "Tech Solutions",
        warrantyStart: "2023-02-11",
        warrantyEnd: "2026-02-11",
        price: 1200,
        status: "Available"
      },
      {
        id: 2,
        itemName: "HP Elitebook 840",
        category: "Laptop",
        brand: "HP",
        model: "840 G5",
        serialNumber: "HP-EL-55411",
        purchaseDate: "2022-07-15",
        supplier: "Mega Tech",
        warrantyStart: "2022-07-15",
        warrantyEnd: "2025-07-15",
        price: 1100,
        status: "Issued"
      },
      {
        id: 3,
        itemName: "Acer LED Monitor",
        category: "Monitor",
        brand: "Acer",
        model: "AL-221",
        serialNumber: "AC-MON-00121",
        purchaseDate: "2023-09-05",
        supplier: "Bright Vision",
        warrantyStart: "2023-09-05",
        warrantyEnd: "2025-09-05",
        price: 200,
        status: "Damaged"
      }
    ],
  
    // -------------------------------
    // 3. Issue and Return
    // -------------------------------
    issuedAssets: [
      {
        id: 1,
        assetId: 2,
        employeeId: 3,
        issueDate: "2024-01-02",
        expectedReturn: "2024-12-31",
        comments: "Assigned for office work",
        status: "Issued"
      }
    ],
  
    returnLogs: [
      {
        id: 1,
        assetId: 1,
        employeeId: 2,
        returnDate: "2024-05-14",
        condition: "Good",
        updatedStatus: "Available"
      }
    ],
  
    issueLog: [
      {
        id: 12,
        employee: "Ali Raza",
        asset: "HP Elitebook 840",
        issueDate: "2024-01-02",
        returnDate: null,
        status: "Issued"
      }
    ],
  
    // -------------------------------
    // 4. Employees
    // -------------------------------
    employees: [
      {
        id: 1,
        name: "Ali Khan",
        department: "IT",
        designation: "IT Manager",
        email: "ali.khan@example.com",
        phone: "0300-4455667",
        employeeId: "EMP001",
        assignedAssets: [2]
      },
      {
        id: 2,
        name: "Sara Ahmed",
        department: "HR",
        designation: "HR Officer",
        email: "sara@example.com",
        phone: "0333-5566778",
        employeeId: "EMP002",
        assignedAssets: []
      }
    ],
  
    // -------------------------------
    // 5. Categories & Brands
    // -------------------------------
    categories: [
      { id: 1, name: "Laptop", totalAssets: 25 },
      { id: 2, name: "Desktop", totalAssets: 18 },
      { id: 3, name: "Monitor", totalAssets: 30 },
      { id: 4, name: "Keyboard", totalAssets: 22 },
      { id: 5, name: "Mouse", totalAssets: 20 }
    ],
  
    brands: [
      "Dell",
      "HP",
      "Lenovo",
      "Cisco",
      "Asus",
      "Acer",
      "Samsung",
      "Others"
    ],
  
    // -------------------------------
    // 6. Suppliers
    // -------------------------------
    suppliers: [
      {
        id: 1,
        name: "Tech Solutions",
        contactPerson: "Ahmed Ali",
        phone: "0300-1112233",
        email: "info@techsolutions.com",
        website: "www.techsolutions.com",
        address: "Blue Area, Islamabad"
      },
      {
        id: 2,
        name: "Mega Tech",
        contactPerson: "Rizwan Khan",
        phone: "0345-9988776",
        email: "sales@megatech.pk",
        website: "www.megatech.pk",
        address: "Gulberg Greens, Islamabad"
      }
    ],
  
    // -------------------------------
    // 7. Stock
    // -------------------------------
    stock: {
      inStock: 92,
      issued: 45,
      damaged: 13,
      underRepair: 5
    },
  
    lowStock: [
      { item: "Mouse", count: 3 },
      { item: "Keyboard", count: 2 },
      { item: "HDMI Cable", count: 4 }
    ],
  
    // -------------------------------
    // 8. Maintenance
    // -------------------------------
    maintenance: [
      {
        id: 1,
        assetId: 3,
        issueDescription: "Screen flickering",
        assignedTechnician: "Umar Farooq",
        estimatedCompletion: "2024-12-05",
        status: "In Progress"
      }
    ],
  
    // -------------------------------
    // 9. Reports
    // -------------------------------
    reports: {
      assetSummary: 150,
      issuedAssets: 45,
      damagedAssets: 13,
      upcomingWarrantyExpiries: 7
    },
  
    // -------------------------------
    // 10. User Roles & Permissions
    // -------------------------------
    users: [
      {
        id: 1,
        name: "Admin User",
        role: "Admin",
        permissions: ["add", "edit", "delete", "approve"]
      },
      {
        id: 2,
        name: "IT Support",
        role: "IT Support",
        permissions: ["add", "edit"]
      },
      {
        id: 3,
        name: "Employee",
        role: "Employee",
        permissions: ["view"]
      }
    ],
  
    // -------------------------------
    // 11. Authentication
    // -------------------------------
    auth: [
      {
        email: "admin@example.com",
        password: "admin123",
        role: "Admin"
      },
      {
        email: "it@example.com",
        password: "it123",
        role: "IT Support"
      }
    ]
  };
  
  export default data;
  