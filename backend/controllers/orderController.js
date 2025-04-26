import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    console.log("Decoded User:", req.user); // Debugging log

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const { products, totalAmount, mobile, address } = req.body;

    // Validate required fields
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products in the order" });
    }
    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }
    if (
      !address ||
      !address.street ||
      !address.area ||
      !address.city ||
      !address.pincode
    ) {
      return res.status(400).json({ error: "Complete address is required" });
    }

    const order = new Order({
      user: req.user.userId,
      products,
      totalAmount,
      mobile,
      address: {
        street: address.street,
        area: address.area,
        city: address.city,
        pincode: address.pincode,
      },
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get Orders for Logged-in User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate({
        path: 'products.product',
        select: 'name price image', // Add any other fields you need
      })
      .populate('user', 'name email') // Also populate user if needed
      .lean(); // Convert to plain JavaScript objects

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Orders (Admin Only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'products.product',
        select: 'name price image', // Add any other fields you need
      })
      .populate('user', 'name email')
      .lean();
      console.log("orders", JSON.stringify(orders, null, 2));
      res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Status (Admin Only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel an order (only if the status is 'pending')
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID and check the user's permission
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // If the order is not pending, it can't be cancelled
    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Only pending orders can be cancelled" });
    }

    // Allow the user to cancel their own order or allow admin to cancel any order
    if (
      order.user.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to cancel this order" });
    }

    // Update the order status to 'cancelled'
    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
