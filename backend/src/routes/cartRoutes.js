import { Router } from "express";
import {
  addtoCart,
  getAllCartsByid,
  getCartById,
  updateCart,
  deleteCart,
  getSchedulesByCartId,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addtoCart);
router.get("/cartByIduser", getAllCartsByid);
router.get("/:cartId", getCartById);
router.put("/:cartId", updateCart);
router.delete("/:cartId", deleteCart);

router.get("/:cartId/schedule", getSchedulesByCartId);

export default router;
