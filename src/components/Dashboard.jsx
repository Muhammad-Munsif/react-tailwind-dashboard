// import React, { useState, useEffect } from 'react';

// const initialCategories = [
//   { id: 1, name: 'Electronics', created_at: '2023-01-15' },
//   { id: 2, name: 'Clothing', created_at: '2023-02-20' },
//   { id: 3, name: 'Books', created_at: '2023-03-10' },
//   { id: 4, name: 'Home & Garden', created_at: '2023-04-05' },
//   { id: 5, name: 'Sports', created_at: '2023-05-12' },
// ];

// // Main Dashboard Component
// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const [categories, setCategories] = useState(initialCategories);

//   const handleAddCategory = (name) => {
//     const trimmed = name.trim();
//     if (!trimmed) return;

//     setCategories((prev) => {
//       const nextId = prev.length ? Math.max(...prev.map((cat) => cat.id)) + 1 : 1;
//       return [
//         ...prev,
//         {
//           id: nextId,
//           name: trimmed,
//           created_at: new Date().toISOString().split('T')[0],
//         },
//       ];
//     });
//   };

//   const handleEditCategory = (id, name) => {
//     setCategories((prev) =>
//       prev.map((category) =>
//         category.id === id ? { ...category, name: name.trim() } : category
//       )
//     );
//   };

//   const handleDeleteCategory = (id) => {
//     setCategories((prev) => prev.filter((category) => category.id !== id));
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar
//         isOpen={sidebarOpen}
//         activeComponent={activeComponent}
//         setActiveComponent={setActiveComponent}
//         closeSidebar={() => setSidebarOpen(false)}
//       />

//       <div className="flex-1 flex flex-col md:ml-64">
//         <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         <main className="flex-1 px-4 py-6 md:px-8 md:py-8 pt-20 md:pt-24">
//           {activeComponent === 'dashboard' && <DashboardHome categoriesCount={categories.length} />}
//           {activeComponent === 'categories' && (
//             <CategoriesComponent
//               categories={categories}
//               onAddCategory={handleAddCategory}
//               onEditCategory={handleEditCategory}
//               onDeleteCategory={handleDeleteCategory}
//             />
//           )}
//           {activeComponent === 'subcategories' && (
//             <SubCategoriesComponent categories={categories} />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Sidebar Component
// const Sidebar = ({ isOpen, activeComponent, setActiveComponent, closeSidebar }) => {
//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
//           onClick={closeSidebar}
//         ></div>
//       )}
      
//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//         md:translate-x-0
//       `}>
//         <div className="flex items-center justify-center h-16 bg-gray-900">
//           <h1 className="text-white text-xl font-bold">Dashboard</h1>
//         </div>
        
//         <nav className="mt-8">
//           <div className="px-4 space-y-2">
//             <button
//               onClick={() => {
//                 setActiveComponent('dashboard');
//                 closeSidebar();
//               }}
//               className={`w-full flex items-center px-4 py-3 text-gray-300 rounded-lg ${
//                 activeComponent === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'
//               }`}
//             >
//               <i className="fas fa-tachometer-alt mr-3"></i>
//               Dashboard
//             </button>
            
//             <button
//               onClick={() => {
//                 setActiveComponent('categories');
//                 closeSidebar();
//               }}
//               className={`w-full flex items-center px-4 py-3 text-gray-300 rounded-lg ${
//                 activeComponent === 'categories' ? 'bg-gray-700' : 'hover:bg-gray-700'
//               }`}
//             >
//               <i className="fas fa-list mr-3"></i>
//               Categories
//             </button>
            
//             <button
//               onClick={() => {
//                 setActiveComponent('subcategories');
//                 closeSidebar();
//               }}
//               className={`w-full flex items-center px-4 py-3 text-gray-300 rounded-lg ${
//                 activeComponent === 'subcategories' ? 'bg-gray-700' : 'hover:bg-gray-700'
//               }`}
//             >
//               <i className="fas fa-layer-group mr-3"></i>
//               Sub Categories
//             </button>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// // Navbar Component
// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <header className="fixed top-0 left-0 right-0 md:left-64 bg-white shadow-sm z-30 border-b border-gray-200">
//       <div className="flex items-center justify-between h-16 px-4 md:px-6">
//         <div className="flex items-center">
//           <button
//             onClick={toggleSidebar}
//             className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
//           >
//             <i className="fas fa-bars"></i>
//           </button>
//           <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">Admin Panel</h1>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hidden md:block"
//             />
//             <i className="fas fa-search absolute left-3 top-3 text-gray-400 hidden md:block"></i>
//           </div>
          
//           <div className="relative">
//             <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
//               <i className="fas fa-bell"></i>
//             </button>
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               3
//             </span>
//           </div>
          
//           <div className="flex items-center">
//             <img
//               className="h-8 w-8 rounded-full object-cover"
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt="User profile"
//             />
//             <span className="ml-2 text-gray-700 hidden md:block">John Doe</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Categories Component
// const CategoriesComponent = ({
//   categories,
//   onAddCategory,
//   onEditCategory,
//   onDeleteCategory,
// }) => {
//   const [newCategory, setNewCategory] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState('');

//   const handleAdd = () => {
//     onAddCategory(newCategory);
//     setNewCategory('');
//   };

//   const startEditing = (id, name) => {
//     setEditingId(id);
//     setEditName(name);
//   };

//   const saveEdit = (id) => {
//     onEditCategory(id, editName);
//     setEditingId(null);
//     setEditName('');
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800">Categories</h2>

//         <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
//           <input
//             type="text"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             placeholder="New category name"
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:bg-blue-300"
//             disabled={!newCategory.trim()}
//           >
//             Add Category
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 ID
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Created
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {categories.map((category) => (
//               <tr key={category.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {category.id}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {editingId === category.id ? (
//                     <input
//                       type="text"
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                   ) : (
//                     category.name
//                   )}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {category.created_at}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-3">
//                   {editingId === category.id ? (
//                     <button
//                       onClick={() => saveEdit(category.id)}
//                       className="text-green-600 hover:text-green-900"
//                     >
//                       <i className="fas fa-check mr-1"></i>
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => startEditing(category.id, category.name)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <i className="fas fa-edit mr-1"></i>
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={() => onDeleteCategory(category.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <i className="fas fa-trash mr-1"></i>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // SubCategories Component
// const SubCategoriesComponent = ({ categories }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useEffect(() => {
//     if (!selectedCategory) return;
//     const exists = categories.find((category) => category.id === selectedCategory.id);
//     if (!exists) {
//       setSelectedCategory(null);
//     }
//   }, [categories, selectedCategory]);

//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Sub Categories</h2>

//       <div className="mb-8">
//         <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>

//         <div className="relative">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="w-full md:w-72 flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <span>
//               {selectedCategory
//                 ? `${selectedCategory.name} (ID: ${selectedCategory.id})`
//                 : 'Select a category'}
//             </span>
//             <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute z-10 w-full md:w-72 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//               <div className="p-2 border-b">
//                 <input
//                   type="text"
//                   placeholder="Search categories..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="max-h-60 overflow-y-auto">
//                 {filteredCategories.length > 0 ? (
//                   filteredCategories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => {
//                         setSelectedCategory(category);
//                         setIsDropdownOpen(false);
//                         setSearchTerm('');
//                       }}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
//                     >
//                       <span className="font-medium">{category.name}</span>
//                       <span className="block text-xs text-gray-500">ID: {category.id}</span>
//                     </button>
//                   ))
//                 ) : (
//                   <div className="px-4 py-2 text-gray-500">No categories found</div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {selectedCategory && (
//           <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
//             <h3 className="font-medium text-blue-800">Selected Category Details</h3>
//             <p className="text-blue-700">
//               ID: {selectedCategory.id} • Name: {selectedCategory.name} • Created:{' '}
//               {selectedCategory.created_at}
//             </p>
//           </div>
//         )}
//       </div>

//       <div>
//         <h3 className="text-lg font-medium text-gray-700 mb-4">
//           Sub Categories for {selectedCategory ? selectedCategory.name : 'Selected Category'}
//         </h3>
//         <p className="text-gray-600">
//           {selectedCategory
//             ? `Here you would load and display the sub-categories that belong to ${selectedCategory.name}.`
//             : 'Pick a category from the dropdown to see its sub-categories.'}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Dashboard Home Component
// const DashboardHome = ({ categoriesCount }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
//           <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Categories</h3>
//           <p className="text-3xl font-bold text-blue-600">{categoriesCount}</p>
//         </div>
        
//         <div className="bg-green-50 p-6 rounded-lg border border-green-100">
//           <h3 className="text-lg font-semibold text-green-800 mb-2">Total Subcategories</h3>
//           <p className="text-3xl font-bold text-green-600">42</p>
//         </div>
        
//         <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
//           <h3 className="text-lg font-semibold text-purple-800 mb-2">Active Users</h3>
//           <p className="text-3xl font-bold text-purple-600">1,248</p>
//         </div>
//       </div>
      
//       <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
//         <ul className="space-y-3">
//           <li className="flex items-center">
//             <i className="fas fa-plus-circle text-green-500 mr-3"></i>
//             <span>New category "Furniture" was added</span>
//           </li>
//           <li className="flex items-center">
//             <i className="fas fa-edit text-blue-500 mr-3"></i>
//             <span>Category "Electronics" was updated</span>
//           </li>
//           <li className="flex items-center">
//             <i className="fas fa-trash text-red-500 mr-3"></i>
//             <span>Category "Toys" was deleted</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react'
import  data from '../mockData/data'

const Dashboard = () => {
  return (
    <div>
      {/* <h1>Dashboad</h1> */}
      <div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 '>
        {data.dashboard.asset.map((item) => (
            <div key={item.asset} className='bg-white p-5 rounded-lg shadow'>
            <h1 className='text-1xl font-bold text-gray-400'>{item.name}</h1>
            <p className='text-2xl font-bold text-gray-500'>{item.value}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
