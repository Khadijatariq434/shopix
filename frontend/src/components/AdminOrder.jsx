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
      const response = await fetch("https://shopix-backend-yzwb.onrender.com/api/orders/all", {
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
        `https://shopix-backend-yzwb.onrender.com/api/orders/${orderId}`,
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
          <div className="text-center py-8 text-gray-600">No orders found</div>
        ) : (
          Object.keys(groupedOrders).map((monthYear) => (
            <div key={monthYear} className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{monthYear}</h3>
              <div className="space-y-4">
                {groupedOrders[monthYear].map((order) => (
                  <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer"
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <FiPackage className="text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">{order.productName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                          <OrderStatusBadge status={order.status} />
                        </div>
                      </div>
                      <FiChevronDown
                        className={`transition-transform duration-300 transform ${
                          expandedOrderId === order._id ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {expandedOrderId === order._id && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600">Total Amount:</span>
                            <span className="font-semibold text-gray-900">
                              ${order.totalAmount}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600">Customer:</span>
                            <span className="font-semibold text-gray-900">{order.customerName}</span>
                          </div>
                        </div>

                        {/* Update order status */}
                        <div className="mt-4 space-x-2">
                          {["pending", "shipped", "delivered", "cancelled"].map((status) => (
                            <button
                              key={status}
                              onClick={() => updateOrderStatus(order._id, status)}
                              className={`px-4 py-2 rounded-md text-sm font-medium ${
                                status === order.status
                                  ? "bg-gray-300 text-gray-800"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
