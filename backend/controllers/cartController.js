import User from "../models/User.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    console.log("Received request:", req.body);
    console.log("User in request:", req.user);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(new mongoose.Types.ObjectId(req.user.userId));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find((item) =>
      item.productId.equals(new mongoose.Types.ObjectId(productId))
    );

    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      user.cart.push({ productId, quantity: quantity || 1 });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Add to Cart Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Remove from Cart
export const removeFromCart = async (req, res) => {
    try {
      const { productId } = req.body;
  
      // Find user
      const user = await User.findById(new mongoose.Types.ObjectId(req.user.userId));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Filter out the product from the cart
      user.cart = user.cart.filter(
        (item) => !item.productId.equals(productId)
      );
  
      await user.save();
      res.status(200).json({ message: "Product removed from cart", cart: user.cart });
    } catch (error) {
      console.error("Remove from Cart Error:", error);
      res.status(500).json({ error: "Failed to remove product from cart" });
    }
  };

  
  // ✅ Update Cart (Change Quantity)
export const updateCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      // Find user
      const user = await User.findById(new mongoose.Types.ObjectId(req.user.userId));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Find product in cart
      const cartItem = user.cart.find((item) => item.productId.equals(productId));
  
      if (!cartItem) {
        return res.status(404).json({ error: "Product not found in cart" });
      }
  
      // Update quantity
      if (quantity <= 0) {
        // Remove product if quantity is 0 or less
        user.cart = user.cart.filter((item) => !item.productId.equals(productId));
      } else {
        cartItem.quantity = quantity;
      }
  
      await user.save();
      res.status(200).json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
      console.error("Update Cart Error:", error);
      res.status(500).json({ error: "Failed to update cart" });
    }
  };
  
  // ✅ View Cart (Get User's Cart)
export const viewCart = async (req, res) => {
  console.log("req user",req.user)
  const userId= new mongoose.Types.ObjectId(req.user.userId)
    try {
      // Find user and populate cart with product details
      const user = await User.findById(userId).populate({
        path:"cart.productId",
        select:"name price image"
    });
      console.log("user",user)
  console.log("cart",user.cart)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.error("View Cart Error:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  };

  
  // ✅ Clear Cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(new mongoose.Types.ObjectId(req.user.userId));
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Empty the cart
    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully", cart: user.cart });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
