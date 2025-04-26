import express from "express";
import {
  addNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Define routes and link them to controllers
router.post("/",protect, upload.single("image"), isAdmin, addNewProduct);
router.get("/",getProducts);
router.get("/:id",  getProductById);
router.put("/:id",protect, upload.single("image"), isAdmin, updateProduct);
router.delete("/:id",protect, isAdmin, deleteProduct);

export default router;

//admintoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FiMTZjOTZiNjNkODNiMGJlMzVhYmYiLCJyb2xlIjoidXNlciIsImlhdCI6MTczOTI2NjQxMSwiZXhwIjoxNzM5ODcxMjExfQ.gvisRlDtjymoJAu-dzgZnenQ2sgRVQ1RYD-w9CsrC_M
