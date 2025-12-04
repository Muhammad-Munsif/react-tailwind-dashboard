// // src/components/layout/Layout.jsx
// import React, { useState } from 'react';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import { Menu, X, Bell, User, Search } from 'lucide-react';

// const Layout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main Content */}
//       <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
//         <div className="p-4 md:p-6">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Layout;
