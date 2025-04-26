
// import React, { useEffect, useState } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import {
//   FiFilter, FiSearch, FiDownload, FiChevronDown, FiChevronUp,
//   FiCalendar, FiDollarSign, FiPackage, FiTruck, FiCheck,
//   FiX, FiAlertCircle, FiClock, FiUser, FiMapPin, FiPhone, FiMail, FiShoppingBag
// } from "react-icons/fi";

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   const statusConfig = {
//     pending: {
//       bgColor: 'bg-yellow-100',
//       textColor: 'text-yellow-800',
//       icon: <FiClock size={14} className="mr-1" />,
//       label: 'Pending'
//     },
//     processing: {
//       bgColor: 'bg-blue-100',
//       textColor: 'text-blue-800',
//       icon: <FiPackage size={14} className="mr-1" />,
//       label: 'Processing'
//     },
//     shipped: {
//       bgColor: 'bg-indigo-100',
//       textColor: 'text-indigo-800',
//       icon: <FiTruck size={14} className="mr-1" />,
//       label: 'Shipped'
//     },
//     delivered: {
//       bgColor: 'bg-green-100',
//       textColor: 'text-green-800',
//       icon: <FiCheck size={14} className="mr-1" />,
//       label: 'Delivered'
//     },
//     cancelled: {
//       bgColor: 'bg-red-100',
//       textColor: 'text-red-800',
//       icon: <FiX size={14} className="mr-1" />,
//       label: 'Cancelled'
//     }
//   };

//   const config = statusConfig[status] || statusConfig.pending;

//   return (
//     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
//       {config.icon}
//       {config.label}
//     </span>
//   );
// };

// // Order Detail Panel Component
// const OrderDetailPanel = ({ order, onStatusChange }) => {
//   return (
//     <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Customer Information */}
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 flex items-center">
//             <FiUser className="mr-2 text-indigo-500" />
//             Customer Information
//           </h3>
//           <div className="space-y-3">
//             <div>
//               <span className="text-xs text-gray-500 block">Name</span>
//               <span className="font-medium">{order.user?.name || "Guest User"}</span>
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Email</span>
//               <span className="font-medium">{order.user?.email || "N/A"}</span>
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Phone</span>
//               <span className="font-medium">{order.mobile || "N/A"}</span>
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Customer ID</span>
//               <span className="font-medium">{order.user?._id || "N/A"}</span>
//             </div>
//           </div>
//         </div>

//         {/* Shipping Information */}
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 flex items-center">
//             <FiMapPin className="mr-2 text-indigo-500" />
//             Shipping Address
//           </h3>
//           {order.address ? (
//             <address className="not-italic space-y-1">
//               <div className="font-medium">{order.user?.name || "Guest User"}</div>
//               {order.address.street && <div>{order.address.street}</div>}
//               {order.address.area && <div>{order.address.area}</div>}
//               <div>
//                 {order.address.city && `${order.address.city}, `}
//                 {order.address.state && `${order.address.state} `}
//                 {order.address.pincode && order.address.pincode}
//               </div>
//               {order.address.country && <div>{order.address.country}</div>}
//               {order.mobile && (
//                 <div className="flex items-center mt-2 text-gray-600">
//                   <FiPhone className="mr-2" size={14} />
//                   {order.mobile}
//                 </div>
//               )}
//             </address>
//           ) : (
//             <div className="text-gray-500 italic">No address information available</div>
//           )}
//         </div>

//         {/* Order Status & Details */}
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 flex items-center">
//             <FiPackage className="mr-2 text-indigo-500" />
//             Order Status
//           </h3>
//           <div className="space-y-3">
//             <div>
//               <span className="text-xs text-gray-500 block">Current Status</span>
//               <StatusBadge status={order.status} />
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Update Status</span>
//               <select
//                 value={order.status}
//                 onChange={(e) => onStatusChange(order._id, e.target.value)}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="processing">Processing</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Date Placed</span>
//               <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Last Updated</span>
//               <span className="font-medium">{new Date(order.updatedAt).toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Order Items */}
//       <div className="mt-6">
//         <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
//           Order Items ({order.products?.length || 0})
//         </h3>
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quantity
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {(order.products || []).map((product, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
//                         {product.image ? (
//                           <img
//                             src={`http://localhost:5000/${product.image}`}
//                             alt={product.name}
//                             className="h-10 w-10 object-cover"
//                           />
//                         ) : (
//                           <div className="h-10 w-10 flex items-center justify-center">
//                             <FiPackage className="text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                         <div className="text-sm text-gray-500">
//                           {product.productId && `ID: ${product.productId}`}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">₹{product.price?.toFixed(2) || '0.00'}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{product.quantity}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       ₹{((product.price || 0) * product.quantity).toFixed(2)}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="bg-gray-50">
//               <tr>
//                 <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900">
//                   Subtotal
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                   ₹{order.totalAmount?.toFixed(2) || '0.00'}
//                 </td>
//               </tr>
//               {order.shippingFee !== undefined && (
//                 <tr>
//                   <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900">
//                     Shipping
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                     ₹{order.shippingFee.toFixed(2)}
//                   </td>
//                 </tr>
//               )}
//               {order.taxAmount !== undefined && (
//                 <tr>
//                   <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900">
//                     Tax
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                     ₹{order.taxAmount.toFixed(2)}
//                   </td>
//                 </tr>
//               )}
//               <tr className="bg-gray-100">
//                 <td colSpan="3" className="px-6 py-4 text-right text-sm font-bold text-gray-900">
//                   Total
//                 </td>
//                 <td className="px-6 py-4 text-sm font-bold text-gray-900">
//                   ₹{order.totalAmount?.toFixed(2) || '0.00'}
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex justify-end space-x-3">
//         <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//           Print Order
//         </button>
//         <button className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//           Email Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedOrderId, setExpandedOrderId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortOption, setSortOption] = useState("date-desc");
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [ordersPerPage] = useState(10);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     filterAndSortOrders();
//   }, [orders, searchTerm, filterStatus, sortOption, dateRange]);

//   useEffect(() => {
//     updatePagination();
//   }, [filteredOrders]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/api/orders/all", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await response.json();

//       if (response.ok) {
//         // Add updatedAt if not present in the data
//         const ordersWithDates = data.map(order => ({
//           ...order,
//           createdAt: order.createdAt || new Date().toISOString(),
//           updatedAt: order.updatedAt || order.createdAt || new Date().toISOString()
//         }));
//         setOrders(ordersWithDates);
//         setFilteredOrders(ordersWithDates);
//       } else {
//         setError(data.error);
//         toast.error(data.error || "Failed to fetch orders");
//       }
//     } catch (err) {
//       setError("Failed to fetch orders");
//       toast.error("Network error occurred while fetching orders");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       setStatusUpdateLoading(orderId);
//       toast.loading(`Updating order status to ${status}...`);

//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (response.ok) {
//         toast.dismiss();
//         toast.success(`Order status updated to ${status}`);

//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order
//           )
//         );
//       } else {
//         const data = await response.json();
//         toast.dismiss();
//         toast.error(data.error || "Failed to update order status");
//       }
//     } catch (err) {
//       toast.dismiss();
//       toast.error("Network error occurred while updating order status");
//       console.error(err);
//     } finally {
//       setStatusUpdateLoading(null);
//     }
//   };

//   const filterAndSortOrders = () => {
//     let result = [...orders];

//     // Filter by status
//     if (filterStatus !== "all") {
//       result = result.filter(order => order.status === filterStatus);
//     }

//     // Filter by search term (check user name, email, phone, order ID)
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(order =>
//         (order.user?.name && order.user.name.toLowerCase().includes(term)) ||
//         (order.user?.email && order.user.email.toLowerCase().includes(term)) ||
//         (order.mobile && order.mobile.includes(term)) ||
//         (order._id && order._id.toLowerCase().includes(term))
//       );
//     }

//     // Filter by date range
//     if (dateRange.start && dateRange.end) {
//       const startDate = new Date(dateRange.start);
//       const endDate = new Date(dateRange.end);
//       endDate.setHours(23, 59, 59, 999); // Set to end of day

//       result = result.filter(order => {
//         const orderDate = new Date(order.createdAt);
//         return orderDate >= startDate && orderDate <= endDate;
//       });
//     }

//     // Sort orders
//     result = sortOrders(result, sortOption);

//     setFilteredOrders(result);
//   };

//   const sortOrders = (orders, option) => {
//     const sortedOrders = [...orders];

//     switch (option) {
//       case "date-asc":
//         return sortedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       case "date-desc":
//         return sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       case "amount-asc":
//         return sortedOrders.sort((a, b) => a.totalAmount - b.totalAmount);
//       case "amount-desc":
//         return sortedOrders.sort((a, b) => b.totalAmount - a.totalAmount);
//       case "status":
//         return sortedOrders.sort((a, b) => a.status.localeCompare(b.status));
//       default:
//         return sortedOrders;
//     }
//   };

//   const updatePagination = () => {
//     setTotalPages(Math.max(1, Math.ceil(filteredOrders.length / ordersPerPage)));
//     // Reset to first page if current page is out of bounds
//     if (page > Math.ceil(filteredOrders.length / ordersPerPage)) {
//       setPage(1);
//     }
//   };

//   const resetFilters = () => {
//     setSearchTerm("");
//     setFilterStatus("all");
//     setSortOption("date-desc");
//     setDateRange({ start: "", end: "" });
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//   };

//   // Format date with time
//   const formatDateTime = (dateString) => {
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleString('en-US', options);
//   };

//   // Format date only
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleString('en-US', options);
//   };

//   // Get current orders for pagination
//   const getCurrentOrders = () => {
//     const indexOfLastOrder = page * ordersPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//     return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   };

//   // Export orders as CSV
//   const exportOrdersCSV = () => {
//     const headers = [
//       "Order ID",
//       "Customer",
//       "Email",
//       "Phone",
//       "Status",
//       "Total Amount",
//       "Items",
//       "Date",
//       "Address"
//     ];

//     const csvData = filteredOrders.map(order => [
//       order._id,
//       order.user?.name || "N/A",
//       order.user?.email || "N/A",
//       order.mobile || "N/A",
//       order.status,
//       order.totalAmount ? `$${order.totalAmount.toFixed(2)}` : "N/A",
//       order.products?.length || 0,
//       formatDate(order.createdAt),
//       order.address ?
//         `${order.address.street || ""}, ${order.address.area || ""}, ${order.address.city || ""}, ${order.address.pincode || ""}` :
//         "N/A"
//     ]);

//     const csvContent = [
//       headers.join(","),
//       ...csvData.map(row => row.join(","))
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", `orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="relative">
//           <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
//           <div className="absolute top-0 left-0 h-20 w-20 flex justify-center items-center">
//             <FiPackage className="text-indigo-600" size={30} />
//           </div>
//           <p className="text-gray-600 mt-4 text-center">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center bg-red-50 rounded-lg p-8 max-w-md">
//           <FiAlertCircle className="mx-auto text-red-500" size={48} />
//           <h2 className="text-xl font-bold text-red-700 mt-4">{error}</h2>
//           <p className="text-gray-600 mt-2">Unable to load orders data</p>
//           <button
//             onClick={fetchOrders}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Toaster position="top-right" />

//       {/* Main container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900 flex items-center">
//             <FiShoppingBag className="mr-2" />
//             Orders Management
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
//           </p>
//         </div>

//         {/* Filters and controls */}
//         <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
//           <div className="p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
//             <div className="w-full lg:w-1/3 relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name, email, or order ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
//               <div>
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="pending">Pending</option>
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>

//               <div>
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                 >
//                   <option value="date-desc">Newest First</option>
//                   <option value="date-asc">Oldest First</option>
//                   <option value="amount-desc">Highest Amount</option>
//                   <option value="amount-asc">Lowest Amount</option>
//                   <option value="status">By Status</option>
//                 </select>
//               </div>

//               <button
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <FiFilter className="mr-2 h-4 w-4" />
//                 Advanced Filters
//               </button>

//               <button
//                 onClick={exportOrdersCSV}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <FiDownload className="mr-2 h-4 w-4" />
//                 Export
//               </button>
//             </div>
//           </div>

//           {/* Advanced filters */}
//           {isFilterOpen && (
//             <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     id="start-date"
//                     value={dateRange.start}
//                     onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     id="end-date"
//                     value={dateRange.end}
//                     onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     onClick={resetFilters}
//                     className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Order list */}
//         {getCurrentOrders().length === 0 ? (
//           <div className="bg-white shadow-sm rounded-lg p-8 text-center">
//             <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               {searchTerm || filterStatus !== "all" || dateRange.start || dateRange.end
//                 ? "Try adjusting your search filters"
//                 : "No orders have been placed yet"}
//             </p>
//             {(searchTerm || filterStatus !== "all" || dateRange.start || dateRange.end) && (
//               <button
//                 onClick={resetFilters}
//                 className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Clear all filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Order
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {getCurrentOrders().map((order) => (
//                     <React.Fragment key={order._id}>
//                       <tr
//                         className={expandedOrderId === order._id ? "bg-indigo-50" : "hover:bg-gray-50"}
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             #{order._id.substring(order._id.length - 8).toUpperCase()}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {order.products?.length || 0} {order.products?.length === 1 ? 'item' : 'items'}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
//                               <FiUser className="text-gray-500" />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {order.user?.name || "Guest User"}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {order.user?.email || "N/A"}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {formatDate(order.createdAt)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             ${order.totalAmount?.toFixed(2) || '0.00'}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <StatusBadge status={order.status} />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end space-x-2">
//                             <button
//                               onClick={() => toggleOrderDetails(order._id)}
//                               className="text-indigo-600 hover:text-indigo-900"
//                             >
//                               {expandedOrderId === order._id ? (
//                                 <FiChevronUp className="h-5 w-5" />
//                               ) : (
//                                 <FiChevronDown className="h-5 w-5" />
//                               )}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>

//                       {/* Expanded Order Details */}
//                       {expandedOrderId === order._id && (
//                         <tr>
//                           <td colSpan="6" className="p-0">
//                             <OrderDetailPanel
//                               order={order}
//                               onStatusChange={updateOrderStatus}
//                             />
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow-sm">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 disabled={page === 1}
//                 className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => setPage(page + 1)}
//                 disabled={page === totalPages}
//                 className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 Next
//               </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{((page - 1) * ordersPerPage) + 1}</span> to{" "}
//                   <span className="font-medium">
//                     {Math.min(page * ordersPerPage, filteredOrders.length)}
//                   </span>{" "}
//                   of <span className="font-medium">{filteredOrders.length}</span> results
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                   <button
//                     onClick={() => setPage(page - 1)}
//                     disabled={page === 1}
//                     className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     <span className="sr-only">Previous</span>
//                     &larr;
//                   </button>

//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setPage(i + 1)}
//                       className={`relative inline-flex items-center px-4 py-2 border ${page === i + 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => setPage(page + 1)}
//                     disabled={page === totalPages}
//                     className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     <span className="sr-only">Next</span>
//                     &rarr;
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;

import { useEffect, useState } from "react";
import {
  FiPackage,
  FiClock,
  FiCheck,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiCalendar,
  FiDollarSign,
  FiTruck,
  FiShoppingBag,
  FiUser,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const OrderStatusBadge = ({ status }) => {
  let statusConfig = {
    pending: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: <FiClock className="mr-1.5" />,
      label: "Pending",
    },
    shipped: {
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-800",
      icon: <FiTruck className="mr-1.5" />,
      label: "Shipped",
    },
    delivered: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: <FiCheck className="mr-1.5" />,
      label: "Delivered",
    },
    cancelled: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      icon: <FiX className="mr-1.5" />,
      label: "Cancelled",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("date-desc");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/orders/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        setError(data.error || "Failed to fetch orders");
        toast.error(data.error || "Failed to fetch orders");
      }
    } catch (err) {
      setError("Failed to fetch orders");
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      toast.loading("Updating order status...");
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
        toast.dismiss();
        toast.success("Order status updated successfully");
      } else {
        const data = await response.json();
        toast.dismiss();
        toast.error(data.error || "Failed to update order status");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to update order status");
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Filter orders based on status
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortOption) {
      case "date-asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "date-desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "amount-asc":
        return a.totalAmount - b.totalAmount;
      case "amount-desc":
        return b.totalAmount - a.totalAmount;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Group orders by month for better organization
  const groupOrdersByMonth = (orders) => {
    const grouped = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt || Date.now());
      const monthYear = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(order);
    });

    return grouped;
  };

  const groupedOrders = groupOrdersByMonth(sortedOrders);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="absolute top-0 left-0 h-16 w-16 flex justify-center items-center">
            <FiPackage className="text-blue-500" size={24} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiShoppingBag className="mr-2" />
              Orders Management
            </h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              {/* Filter by status */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Sort options */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="amount-desc">Highest Amount</option>
                  <option value="amount-asc">Lowest Amount</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {sortedOrders.length === 0 ? (
          <div className="py-16 text-center">
            <FiPackage className="mx-auto h-14 w-14 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {filterStatus === "all"
                ? "There are no orders in the system yet."
                : `There are no orders with '${filterStatus}' status.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {Object.keys(groupedOrders).map((monthYear) => (
              <div key={monthYear} className="bg-white">
                <div className="bg-gray-50 px-6 py-3">
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <FiCalendar className="mr-2" />
                    {monthYear}
                  </h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {groupedOrders[monthYear].map((order) => (
                    <div
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* Order Summary - Always Visible */}
                      <div
                        className="px-6 py-4 cursor-pointer"
                        onClick={() => toggleOrderDetails(order._id)}
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h4 className="text-sm font-medium text-gray-900">
                                Order #
                                {order._id.substring(order._id.length - 8)}
                              </h4>
                              <OrderStatusBadge status={order.status} />
                            </div>

                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {formatDate(order.createdAt || Date.now())}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                ₹{order.totalAmount?.toFixed(2) || "0.00"}
                              </div>
                              {order.user && (
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <FiUser className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {order.user.name || "N/A"}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center mt-4 sm:mt-0">
                            <button className="flex items-center text-blue-600 hover:text-blue-800">
                              {expandedOrderId === order._id ? (
                                <FiChevronUp className="h-5 w-5" />
                              ) : (
                                <FiChevronDown className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Order Details - Expandable */}
                      {expandedOrderId === order._id && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                          <div className="space-y-4">
                            {/* User Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  Customer Information
                                </h5>
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex items-center text-sm text-gray-700 mb-1">
                                    <FiUser className="mr-2 text-gray-400" />
                                    {order.user?.name || "N/A"}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-700 mb-1">
                                    <FiDollarSign className="mr-2 text-gray-400" />
                                    {order.user?.email || "N/A"}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  Contact
                                </h5>
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex items-center text-sm text-gray-700">
                                    <FiPhone className="mr-2 text-gray-400" />
                                    {order.mobile || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Address */}
                            {order.shippingAddress && (
                              <div>
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  Shipping Address
                                </h5>
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex items-start text-sm text-gray-700">
                                    <FiMapPin className="mt-0.5 mr-2 text-gray-400" />
                                    <div>
                                      <p>
                                        {order.shippingAddress.street || "N/A"},{" "}
                                        {order.shippingAddress.city || "N/A"}
                                      </p>
                                      <p>
                                        {order.shippingAddress.state || "N/A"},{" "}
                                        {order.shippingAddress.postalCode || "N/A"}
                                      </p>
                                      <p>
                                        {order.shippingAddress.country || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Status Update */}
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                Update Status
                              </h5>
                              <div className="bg-white p-3 rounded-lg">
                                <select
                                  value={order.status}
                                  onChange={(e) =>
                                    updateOrderStatus(order._id, e.target.value)
                                  }
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>

                            {/* Products List */}
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                                Order Items
                              </h5>
                              <div className="space-y-3">
                                {order.products.map((item) => {
                                  // Handle cases where product might be populated or just an ID
                                  const product = item.product?._id ? item.product : null;
                                  const productName = product?.name || "Product";
                                  const productPrice = product?.price || 0;
                                  const productImage = product?.image;

                                  return (
                                    <div
                                      key={item._id || product?._id || Math.random()}
                                      className="flex items-center space-x-4 rounded-lg bg-white p-3"
                                    >
                                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                        {productImage ? (
                                          <img
                                            src={`http://localhost:5000/${productImage}`}
                                            alt={productName}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center">
                                            <FiPackage className="text-gray-400" />
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">
                                          {productName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Qty: {item.quantity} × ₹{productPrice.toFixed(2)}
                                        </p>
                                      </div>
                                      <div className="text-sm font-medium text-gray-900">
                                        ₹{(item.quantity * productPrice).toFixed(2)}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-gray-200 pt-4">
                              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                                Order Summary
                              </h5>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Subtotal</p>
                                  <p className="text-gray-900">
                                    ₹{order.totalAmount?.toFixed(2) || "0.00"}
                                  </p>
                                </div>
                                {order.shippingFee && (
                                  <div className="flex justify-between">
                                    <p className="text-gray-500">Shipping Fee</p>
                                    <p className="text-gray-900">
                                      ₹{order.shippingFee.toFixed(2)}
                                    </p>
                                  </div>
                                )}
                                {order.taxAmount && (
                                  <div className="flex justify-between">
                                    <p className="text-gray-500">Tax</p>
                                    <p className="text-gray-900">
                                      ₹{order.taxAmount.toFixed(2)}
                                    </p>
                                  </div>
                                )}
                                <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                                  <p className="text-gray-900">Total</p>
                                  <p className="text-gray-900">
                                    ₹{order.totalAmount?.toFixed(2) || "0.00"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;