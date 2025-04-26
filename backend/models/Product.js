import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store image URL
      required: true,
    },
    category: {
      type: [String],
      required: true,
      set: (categories) => categories.map((cat) => cat.toLowerCase()), // Convert each category to lowercase
    },
    
    stock: {
      type: Number,
      required: true,
      default: 1, // Default stock quantity
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

//{
//   "name": "Wireless Headphones",
//   "price": 2999,
//   "description": "High-quality wireless headphones with noise cancellation and long battery life.",
//   "image": "https://example.com/images/headphones.jpg",
//   "category": "Electronics",
  
//   "stock": 50
// }

