import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import connectDB from "./utils/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Google Auth Routes

import { fileURLToPath } from "url"; // Required for ES modules
import "./config/passport.js"; // Google Auth Configuration
import contactRouter from "./routes/contactRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS
app.use(morgan("dev")); // Log requests
connectDB();

// Session middleware for Passport
app.use(
  session({
    secret: process.env.JWT_SECRET, // Use JWT secret as session secret
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRoutes);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contact",contactRouter)
app.use("/auth", authRoutes); // Google Authentication Routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Shopix API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

