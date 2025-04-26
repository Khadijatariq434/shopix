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
  FiFilter,
  FiArrowDown,
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
      console.log("data", data);
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
                                {/* <FiDollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" /> */}
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
                            {order.address && (
                              <div>
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  Shipping Address
                                </h5>
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex items-start text-sm text-gray-700">
                                    <FiMapPin className="mt-0.5 mr-2 text-gray-400" />
                                    <div>
                                      <p>
                                        {order.address.street || "N/A"},{" "}
                                        {order.address.area || "N/A"}
                                      </p>
                                      <p>
                                        {order.address.city || "N/A"},{" "}
                                        {order.address.pincode || "N/A"}
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
                            {order.products && order.products.length > 0 && (
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
                                        <p className="text-sm font-medium text-gray-900">
                                          {item.product?.name ||
                                            "Product not available"}
                                        </p>
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
                            )}

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
