import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(
        "http://localhost:5173/account?error=AuthenticationFailed"
      );
    }

    const token = jwt.sign(
      {
        userId: req.user._id,
        role: req.user.role,
        name: req.user.name, // Include name
        email: req.user.email, // Include email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log("Token generated for Google login:", token);
    // Redirect to the frontend with the token as a query parameter
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

export default router;
