import express from "express";
const router = express.Router();
import { register, login, logout,check } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/checkLogin", authMiddleware,check)

export default router;
