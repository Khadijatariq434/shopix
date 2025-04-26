import express from "express";
import { deleteUser, getAllUsers, loginUser, registerUser } from "../controllers/userController.js";
import { protect, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,(req,res)=>{
    res.json({message: "user profile",user:req.user})
})
router.get("/",verifyToken,getAllUsers);
router.delete("/:id",verifyToken,deleteUser);

export default router;
