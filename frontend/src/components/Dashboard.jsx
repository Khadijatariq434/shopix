// // import { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { useAuth } from "../context/AuthContext";
// // import { jwtDecode } from "jwt-decode";


// // const Dashboard = () => {
// //   const location = useLocation();
// //   const [showLogoutModal, setShowLogoutModal] = useState(false);
// //   const navigate = useNavigate();
// //   const { user, logout , login } = useAuth(); // Fixed destructuring



// //   useEffect(() => {
// //     const queryParams = new URLSearchParams(location.search);
// //     const token = queryParams.get("token");

// //     if (token ) {
// //       // Decode the token to get user information
// //       const decodedUser = jwtDecode(token);

// //       // Save the token and user in the AuthContext
// //       login({ token, ...decodedUser });

// //       // Remove the token from the URL to clean it up
// //       navigate("/dashboard", { replace: true });
// //     }
// //   }, [location, navigate, login]);
// //   useEffect(() => {
// //     if (!user) {
// //       navigate("/account");
// //     }
// //   }, [user, navigate]);

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/account");
// //   };

// //   return (
// //     <div className="flex flex-col pt-16 bg-gray-100">
// //       <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 relative">
// //         {/* Blurred Background when Modal is Open */}
// //         {showLogoutModal && (
// //         <div className="fixed inset-0 backdrop-blur-sm z-40"></div>
// //       )}

// //         {/* Logout Confirmation Modal */}
// //         {showLogoutModal && (
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.3 }}
// //             className="fixed inset-0 flex items-center justify-center z-50"
// //           >
// //             <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
// //               <h3 className="text-xl font-semibold mb-4">
// //                 Are you sure you want to logout?
// //               </h3>
// //               <div className="flex justify-center space-x-4">
// //                 <button
// //                   onClick={() => setShowLogoutModal(false)}
// //                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Dashboard Content */}
// //         {user ? (
// //           <motion.div
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="max-w-6xl mx-auto"
// //           >
// //             {/* Header */}
// //             <div className="flex justify-between items-center mb-8">
// //               <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
// //               <button
// //                 onClick={() => setShowLogoutModal(true)}
// //                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
// //               >
// //                 Logout
// //               </button>
// //             </div>

// //             {/* Welcome Section */}
// //             <motion.div
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5, delay: 0.2 }}
// //               className="bg-white p-8 rounded-xl shadow-lg mb-8"
// //             >
// //               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //                 Welcome back, <span className="text-blue-600">{user.name}</span>!
// //               </h2>
// //               <p className="text-gray-600">
// //                 Here's a quick overview of your account and recent activity.
// //               </p>
// //             </motion.div>

// //             {/* Profile Section */}
// //             <motion.div
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5, delay: 0.4 }}
// //               className="bg-white p-8 rounded-xl shadow-lg mb-8"
// //             >
// //               <h3 className="text-xl font-semibold text-gray-800 mb-6">
// //                 Your Profile
// //               </h3>
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="text-gray-600">Name:</label>
// //                   <p className="text-gray-800 font-medium">{user.name}</p>
// //                 </div>
// //                 <div>
// //                   <label className="text-gray-600">Email:</label>
// //                   <p className="text-gray-800 font-medium">{user.email}</p>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Admin Panel (Only for Admins) */}
// //             {user.role === "admin" && (
// //               <motion.div
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 transition={{ duration: 0.5, delay: 0.6 }}
// //                 className="bg-white p-8 rounded-xl shadow-lg mb-8 border-l-4 border-blue-500"
// //               >
// //                 <h3 className="text-xl font-semibold text-gray-800 mb-6">
// //                   Admin Panel
// //                 </h3>
// //                 <p className="text-gray-600 mb-4">
// //                   Manage products and user orders.
// //                 </p>
// //                 <div className="flex space-x-4">
// //                   <button
// //                     onClick={() => navigate("/admin/products")}
// //                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
// //                   >
// //                     Manage Products
// //                   </button>
// //                   <button
// //                     onClick={() => navigate("/admin/orders")}
// //                     className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
// //                   >
// //                     Manage Orders
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             )}

// //             {/* Recent Activity Section */}
// //             <motion.div
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5, delay: 0.8 }}
// //               className="bg-white p-8 rounded-xl shadow-lg"
// //             >
// //               <h3 className="text-xl font-semibold text-gray-800 mb-6">
// //                 Recent Activity
// //               </h3>
// //               <p className="text-gray-600">No recent activity.</p>
// //             </motion.div>
// //           </motion.div>
// //         ) : (
// //           <div className="flex justify-center items-center h-screen">
// //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { jwtDecode } from "jwt-decode";

// const Dashboard = () => {
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout, login } = useAuth(); // Fixed destructuring
// const location =useLocation();
//  const tokenProcessed =  useRef(false);

//  useEffect(() => {
//   const queryParams = new URLSearchParams(location.search);
//   const token = queryParams.get("token");

//   if (token && !tokenProcessed.current) {
//     try {
//       const decodedUser = jwtDecode(token);
//       console.log("Decoded user from token:", decodedUser);
//       login({ token, ...decodedUser });
//       navigate("/dashboard", { replace: true });
//       tokenProcessed.current = true;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }
// }, [location, navigate, login]);
//   useEffect(() => {
//     if (!user) {
//       navigate("/account");
//     }
//   }, [user, navigate]);

//   const handleLogout = () => {
//     logout();
//     navigate("/account");
//   };

//   return (
//     <div className="flex flex-col pt-16 bg-gray-100">
//       <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 relative">
//         {/* Blurred Background when Modal is Open */}
//         {showLogoutModal && (
//         <div className="fixed inset-0 backdrop-blur-sm z-40"></div>
//       )}

//         {/* Logout Confirmation Modal */}
//         {showLogoutModal && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 flex items-center justify-center z-50"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
//               <h3 className="text-xl font-semibold mb-4">
//                 Are you sure you want to logout?
//               </h3>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={() => setShowLogoutModal(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Dashboard Content */}
//         {user ? (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-6xl mx-auto"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
//               <button
//                 onClick={() => setShowLogoutModal(true)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
//               >
//                 Logout
//               </button>
//             </div>

//             {/* Welcome Section */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="bg-white p-8 rounded-xl shadow-lg mb-8"
//             >
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Welcome back, <span className="text-blue-600">{user.name}</span>!
//               </h2>
//               <p className="text-gray-600">
//                 Here's a quick overview of your account and recent activity.
//               </p>
//             </motion.div>

//             {/* Profile Section */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="bg-white p-8 rounded-xl shadow-lg mb-8"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                 Your Profile
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-gray-600">Name:</label>
//                   <p className="text-gray-800 font-medium">{user.name}</p>
//                 </div>
//                 <div>
//                   <label className="text-gray-600">Email:</label>
//                   <p className="text-gray-800 font-medium">{user.email}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Admin Panel (Only for Admins) */}
//             {user.role === "admin" && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//                 className="bg-white p-8 rounded-xl shadow-lg mb-8 border-l-4 border-blue-500"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                   Admin Panel
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Manage products and user orders.
//                 </p>
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => navigate("/admin/products")}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
//                   >
//                     Manage Products
//                   </button>
//                   <button
//                     onClick={() => navigate("/admin-orders")}
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
//                   >
//                     Manage Orders
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* Recent Activity Section */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.8 }}
//               className="bg-white p-8 rounded-xl shadow-lg"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                 Recent Activity
//               </h3>
//               <p className="text-gray-600">No recent activity.</p>
//             </motion.div>
//           </motion.div>
//         ) : (
//           <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard; 

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import {
  UserCircle,
  LogOut,
  Package,
  ShoppingBag,
  Clock,
  Settings,
  CreditCard,
  Heart,
  Calendar,
  BarChart3,
  Users
} from "lucide-react";

const Dashboard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();
  const location = useLocation();
  const tokenProcessed = useRef(false);

  // Sample data for activity and stats
  const recentActivity = [
    { id: 1, type: "order", description: "Order #12345 placed", date: "2 hours ago", status: "success" },
    { id: 2, type: "review", description: "You reviewed Summer Dress", date: "Yesterday", status: "info" },
    { id: 3, type: "wishlist", description: "Added Men's Jacket to wishlist", date: "3 days ago", status: "info" },
  ];

  const stats = [
    { id: 1, label: "Orders Placed", value: "12", icon: <Package className="h-5 w-5 text-indigo-600" /> },
    { id: 2, label: "Wishlist Items", value: "8", icon: <Heart className="h-5 w-5 text-pink-600" /> },
    { id: 3, label: "Reviews", value: "4", icon: <Star className="h-5 w-5 text-amber-500" /> },
    { id: 4, label: "Active Coupons", value: "2", icon: <Ticket className="h-5 w-5 text-green-600" /> },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token && !tokenProcessed.current) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded user from token:", decodedUser);
        login({ token, ...decodedUser });
        navigate("/dashboard", { replace: true });
        tokenProcessed.current = true;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [location, navigate, login]);

  useEffect(() => {
    if (!user) {
      navigate("/account");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  // Activity status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      success: "bg-green-100 text-green-800",
      warning: "bg-amber-100 text-amber-800",
      error: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status === "success" && "Completed"}
        {status === "warning" && "Pending"}
        {status === "error" && "Failed"}
        {status === "info" && "Info"}
      </span>
    );
  };

  // Activity icon component
  const ActivityIcon = ({ type }) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-8 w-8 p-1.5 bg-indigo-100 text-indigo-600 rounded-lg" />;
      case "review":
        return <Star className="h-8 w-8 p-1.5 bg-amber-100 text-amber-600 rounded-lg" />;
      case "wishlist":
        return <Heart className="h-8 w-8 p-1.5 bg-pink-100 text-pink-600 rounded-lg" />;
      default:
        return <Clock className="h-8 w-8 p-1.5 bg-gray-100 text-gray-600 rounded-lg" />;
    }
  };

  // Nav item component
  const NavItem = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className={active ? "font-medium" : "font-normal"}>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-28">
      {/* Blurred Background when Modal is Open */}
      {showLogoutModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"></div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-8 rounded-xl shadow-xl text-center w-96 mx-4">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Logging Out
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Log Out
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Dashboard Content */}
      {user ? (
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-64 bg-white border-r border-gray-200 p-4 md:h-[calc(100vh-4rem)] md:sticky md:top-16"
          >
            {/* User Profile Summary */}
            <div className="flex items-center space-x-3 mb-8 p-2">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <UserCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <NavItem
                icon={<BarChart3 className="h-5 w-5" />}
                label="Overview"
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              />
              {user.role !== "admin" && (
                <>
                  <NavItem
                    icon={<ShoppingBag className="h-5 w-5" />}
                    label="My Orders"
                    active={activeTab === "orders"}
                    onClick={() => navigate("/orders")}
                  />
                  <NavItem
                    icon={<Heart className="h-5 w-5" />}
                    label="Wishlist"
                    active={activeTab === "wishlist"}
                    onClick={() => setActiveTab("wishlist")}
                  />
                </>
              )}
              {/* <NavItem
                icon={<CreditCard className="h-5 w-5" />}
                label="Payment Methods"
                active={activeTab === "payment"}
                onClick={() => setActiveTab("payment")}
              /> */}
              {/* <NavItem
                icon={<Settings className="h-5 w-5" />}
                label="Account Settings"
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
              /> */}

              {user.role === "admin" && (
                <>
                  <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Admin
                    </p>
                  </div>
                  <NavItem
                    icon={<Package className="h-5 w-5" />}
                    label="Manage Products"
                    active={activeTab === "products"}
                    onClick={() => navigate("/admin/products")}
                  />
                  <NavItem
                    icon={<ShoppingBag className="h-5 w-5" />}
                    label="Manage Orders"
                    active={activeTab === "admin-orders"}
                    onClick={() => navigate("/admin-orders")}
                  />
                  <NavItem
                    icon={<Users className="h-5 w-5" />}
                    label="Manage Users"
                    active={activeTab === "users"}
                    onClick={() => setActiveTab("users")}
                  />
                </>
              )}
            </nav>

            {/* Logout Button */}
            <div className="mt-auto pt-6">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 p-4 md:p-8"
          >
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <svg className="absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/4 transform text-white" fill="currentColor" viewBox="0 0 184 184">
                  <path d="M182 184a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20 0a2 2 0 110-4 2 2 0 010 4zm0-20a2 2 0 110-4 2 2 0 010 4zm0-20a2 2 0 110-4 2 2 0 010 4zm-20 0a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
              <div className="relative">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-indigo-100 max-w-md">
                  Explore your personalized dashboard to manage your orders, wishlists, and account preferences.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center px-5 py-2.5 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition-all font-medium"
                  >
                    Continue Shopping
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="px-6 py-4 flex items-start space-x-4">
                      <ActivityIcon type={activity.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.date}
                        </p>
                      </div>
                      <StatusBadge status={activity.status} />
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center">
                    <svg className="mx-auto h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No recent activity found</p>
                  </div>
                )}
              </div>
              <div className="px-6 py-3 bg-gray-50 rounded-b-xl text-right">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all activity
                </button>
              </div>
            </div>

            {/* Profile Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                  <Settings className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Personal Details
                    </h4>
                    <dl className="divide-y divide-gray-100">
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="text-sm text-gray-900">{user.name}</dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="text-sm text-gray-900">{user.email}</dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                        <dd className="text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
                          }`}>
                            {user.role === "admin" ? "Administrator" : "Customer"}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Account Security
                    </h4>
                    <dl className="divide-y divide-gray-100">
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Password</dt>
                        <dd className="text-sm">
                          <button className="text-indigo-600 hover:text-indigo-500">
                            Change password
                          </button>
                        </dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Two-Factor Auth</dt>
                        <dd className="text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Not Enabled
                          </span>
                        </dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                        <dd className="text-sm text-gray-900">Today, 2:34 PM</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Star component for reviews
const Star = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Ticket component for coupons
const Ticket = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

export default Dashboard;
