import express from "express";
import { addToCart, clearCart, removeFromCart, updateCart, viewCart } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add to Cart (Protected Route)
router.post("/add", verifyToken, addToCart);
router.post("/remove",verifyToken, removeFromCart);
// ✅ Update Cart (Change Quantity) - Protected Route
router.post("/update", verifyToken, updateCart);
// ✅ View Cart - Protected Route
router.get("/", verifyToken, viewCart);
router.delete("/clear-cart", verifyToken, clearCart );



export default router;
