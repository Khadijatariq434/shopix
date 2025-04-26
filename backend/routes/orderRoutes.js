import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder); // Create order (User)
router.get("/", verifyToken, getUserOrders); // Get user's orders
router.get("/all", verifyToken, isAdmin, getAllOrders); // Get all orders (Admin)
router.put("/:orderId", verifyToken, isAdmin, updateOrderStatus); // Update order status (Admin)
router.delete("/:orderId",verifyToken,cancelOrder);

export default router;

// {
//     "user":"67b4be7ff2bcd38b88b32dbb",
//     "products":[
//       {"product":"67a8da0b73c8aef9b863d0ee", "quantity":1
//       }
//     ],
//     "totalAmount":200
    
//     }
  