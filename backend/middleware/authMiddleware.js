import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose"

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

      // Get user from DB (but exclude password)
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Access denied. Admins only!" });
    }
  };
  

  
 
 
  // export const verifyToken = async (req, res, next) => {
  //     try {
  //         let token = req.headers.authorization;
  //         if (!token) {
  //             return res.status(401).json({ error: "No token provided!" });
  //         }
  
  //         token = token.split(" ")[1]; // Remove 'Bearer'
  //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  //         console.log("Decoded Token:", decoded); // Debugging
  
  //         if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
  //             return res.status(400).json({ error: "Invalid user ID format!" });
  //         }
  
  //         const user = await User.findById(new mongoose.Types.ObjectId(decoded.userId));
  //         console.log("User Found in DB:", user); // Debugging
  
  //         if (!user) {
  //             return res.status(404).json({ error: "User not found!" });
  //         }
  
  //         req.user = user;
  //         next();
  //     } catch (error) {
  //         console.error("Auth Error:", error.message);
  //         return res.status(401).json({ error: "Invalid token!" });
  //     }
  // };
  
  
  export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Access Denied: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging
  
      // Ensure userId is explicitly set
      req.user = { userId: decoded.userId, role: decoded.role };
  
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid Token" });
    }
  };
  

