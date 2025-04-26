// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const OrderList = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/orders", {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setOrders(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       toast.success("Order cancelled successfully");
//       fetchOrders(); // Refresh the orders list
//     } catch (error) {
//       toast.error("Failed to cancel order");
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchOrders();
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading orders...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-24 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-gray-600 text-center py-10">You have no orders yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Order ID: {order._id}
//                   </h3>
//                   <p className="text-gray-600">
//                     Status:{" "}
//                     <span
//                       className={`font-bold ${
//                         order.status === "pending"
//                           ? "text-yellow-600"
//                           : order.status === "cancelled"
//                           ? "text-red-600"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </p>
//                   <p className="text-gray-600">
//                     Total Amount: ${order.totalAmount.toFixed(2)}
//                   </p>
//                 </div>
//                 {order.status === "pending" && (
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
//                     onClick={() => cancelOrder(order._id)}
//                   >
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <h4 className="text-md font-semibold text-gray-800">Products:</h4>
//                 <ul className="list-disc pl-6">
//                   {order.products.map((product) => (
//                     <li key={product._id} className="text-gray-600">
//                       {product.name} (Quantity: {product.quantity})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderList;

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
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
} from "react-icons/fi";

const OrderStatusBadge = ({ status }) => {
  let statusConfig = {
    pending: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: <FiClock className="mr-1.5" />,
      label: "Pending",
    },
    processing: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: <FiPackage className="mr-1.5" />,
      label: "Processing",
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

const OrderList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("date-desc");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      toast.loading("Cancelling your order...");
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.dismiss();
      toast.success("Order cancelled successfully");
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to cancel order");
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 mt-14">
      <Toaster />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiShoppingBag className="mr-2" />
              Your Orders
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
                  <option value="processing">Processing</option>
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
                ? "You haven't placed any orders yet."
                : `You don't have any orders with '${filterStatus}' status.`}
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Products
              </Link>
            </div>
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
                                <FiDollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                ${order.totalAmount.toFixed(2)}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <FiPackage className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {order.products.reduce(
                                  (total, item) => total + item.quantity,
                                  0
                                )}{" "}
                                {order.products.reduce(
                                  (total, item) => total + item.quantity,
                                  0
                                ) === 1
                                  ? "item"
                                  : "items"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center mt-4 sm:mt-0">
                            {order.status === "pending" && (
                              <button
                                className="mr-3 inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    window.confirm(
                                      "Are you sure you want to cancel this order?"
                                    )
                                  ) {
                                    cancelOrder(order._id);
                                  }
                                }}
                              >
                                <FiX className="mr-1" />
                                Cancel
                              </button>
                            )}
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
                            {/* Products List */}
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                                Order Items
                              </h5>
                              <div className="space-y-3">
                                {order.products.map((item) => (
                                  <div
                                    key={item._id}
                                    className="flex items-center space-x-4 rounded-lg bg-white p-3"
                                  >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                      {item.product?.image ? (
                                        <img
                                          src={`http://localhost:5000/${item.product.image}`}
                                          alt={item.product.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <FiPackage className="text-gray-400" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <Link
                                        to={`/products/${item.product?._id}`}
                                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {item.product?.name ||
                                          "Product not available"}
                                      </Link>
                                      <p className="text-sm text-gray-500">
                                        Qty: {item.quantity} × ₹
                                        {item.product?.price?.toFixed(2) ||
                                          "0.00"}
                                      </p>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">
                                      ₹
                                      {(
                                        item.quantity *
                                        (item.product?.price || 0)
                                      ).toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-gray-200 pt-4">
                              <div className="flex justify-between items-center">
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Order Summary
                                </h5>
                                {order.status === "delivered" && (
                                  <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100">
                                    <FiCheck className="mr-1.5" />
                                    Rate Products
                                  </button>
                                )}
                              </div>

                              <div className="mt-3 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Subtotal</p>
                                  <p className="text-gray-900">
                                    ₹
                                    {order.subtotal?.toFixed(2) ||
                                      order.totalAmount.toFixed(2)}
                                  </p>
                                </div>
                                {order.shippingFee !== undefined && (
                                  <div className="flex justify-between">
                                    <p className="text-gray-500">Shipping</p>
                                    <p className="text-gray-900">
                                      ₹{order.shippingFee.toFixed(2)}
                                    </p>
                                  </div>
                                )}
                                {order.taxAmount !== undefined && (
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
                                    ₹{order.totalAmount.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Shipping Address */}
                            {order.shippingAddress && (
                              <div className="border-t border-gray-200 pt-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  Shipping Address
                                </h5>
                                <address className="not-italic text-sm text-gray-500">
                                  {order.shippingAddress.name}
                                  <br />
                                  {order.shippingAddress.street}
                                  <br />
                                  {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.state}{" "}
                                  {order.shippingAddress.zip}
                                  <br />
                                  {order.shippingAddress.country}
                                </address>
                              </div>
                            )}

                            {/* Order Actions */}
                            <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Contact Support
                              </button>
                              {(order.status === "delivered" ||
                                order.status === "shipped") && (
                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                  Track Package
                                </button>
                              )}
                              {order.invoice && (
                                <a
                                  href={order.invoice}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  View Invoice
                                </a>
                              )}
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

export default OrderList;
