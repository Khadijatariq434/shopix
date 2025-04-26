// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false); // For Google login
//   const navigate = useNavigate();
//   const { user, login } = useAuth(); // Get user & login function from AuthContext

//   useEffect(() => {
//     if (user) {
//       navigate("/dashboard"); // Redirect if already logged in
//     } else {
//       const timer = setTimeout(() => {
//         setIsPageLoading(false);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (!res.ok) {
//         setError(data.error || "Login failed");
//         return;
//       }

//       login(data.user); // Use AuthContext to log in the user
//       navigate("/dashboard"); // Redirect to dashboard
//     } catch (err) {
//       setLoading(false);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const handleGoogleLogin = () => {
//     setIsGoogleLoading(true);
//     window.open("http://localhost:5000/auth/google", "_self");  };

//   if (isPageLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
//         <div className="flex items-center justify-center">
//           <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 mt-16">
//       <div className="bg-white p-8 shadow-2xl rounded-lg w-96 transform transition-all duration-500 hover:scale-105">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
//         {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//             <input
//               type="password"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 flex items-center justify-center"
//             disabled={loading}
//           >
//             {loading ? (
//               <div className="flex items-center">
//                 <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Logging in...
//               </div>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         <div className="my-4 flex items-center justify-center">
//           <div className="w-full border-t border-gray-300"></div>
//           <span className="px-3 text-gray-500">OR</span>
//           <div className="w-full border-t border-gray-300"></div>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
//           disabled={isGoogleLoading}
//         >
//           {isGoogleLoading ? (
//             <div className="flex items-center">
//               <svg className="animate-spin h-5 w-5 mr-3 text-gray-700" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Redirecting...
//             </div>
//           ) : (
//             <>
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M23.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.7-2.5 3.6v3h4.1c2.4-2.2 3.8-5.5 3.8-8.7z"></path>
//                 <path fill="#34A853" d="M12 24c3.4 0 6.2-1.1 8.3-3l-4.1-3c-1.1.8-2.6 1.3-4.2 1.3-3.2 0-6-2.1-7-5h-4.2v3.1c2 4 6 6.6 10.2 6.6z"></path>
//                 <path fill="#FBBC05" d="M5 14.9c-.5-1.4-.5-2.9 0-4.3V7.5H.8C-.4 10-.4 14 .8 16.5l4.2-3z"></path>
//                 <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.7l3.4-3.4C17.8 1 15 0 12 0 7.8 0 4 2.6 1.7 6.5l4.2 3C7 6.5 9.3 4.8 12 4.8z"></path>
//               </svg>
//               Continue with Google
//             </>
//           )}
//         </button>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-purple-600 font-semibold hover:text-purple-700 transition-all duration-300">
//               Register Now
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      login(data.user);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.open("http://localhost:5000/auth/google", "_self");
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-opacity-20 rounded-full animate-ping"></div>
            <svg className="animate-spin w-full h-full text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-white text-lg font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 sm:p-6 md:p-8 mt-14">
      <div className="relative w-full max-w-md mx-auto">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-indigo-400 rounded-full opacity-30 animate-blob"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-pink-400 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-4000"></div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 p-8 md:p-10 shadow-2xl rounded-2xl w-full backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90 transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(76,29,149,0.2)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 inline-block">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 animate-pulse">
              <p className="text-red-700 dark:text-red-400 text-sm font-medium flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full p-4 pl-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className={`w-2 h-2 rounded-full ${email ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full p-4 pl-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className={`w-2 h-2 rounded-full ${password ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Sign In</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">or continue with</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-4 px-6 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-gray-700 dark:text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.7-2.5 3.6v3h4.1c2.4-2.2 3.8-5.5 3.8-8.7z"></path>
                  <path fill="#34A853" d="M12 24c3.4 0 6.2-1.1 8.3-3l-4.1-3c-1.1.8-2.6 1.3-4.2 1.3-3.2 0-6-2.1-7-5h-4.2v3.1c2 4 6 6.6 10.2 6.6z"></path>
                  <path fill="#FBBC05" d="M5 14.9c-.5-1.4-.5-2.9 0-4.3V7.5H.8C-.4 10-.4 14 .8 16.5l4.2-3z"></path>
                  <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.7l3.4-3.4C17.8 1 15 0 12 0 7.8 0 4 2.6 1.7 6.5l4.2 3C7 6.5 9.3 4.8 12 4.8z"></path>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300 inline-flex items-center">
                Create an account
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
