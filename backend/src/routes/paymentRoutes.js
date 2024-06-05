import { Router } from "express";
import {
  createPayment,
  getPaymentByOrderID,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createPayment);
router.get("/:orderId", getPaymentByOrderID);
router.put("/:paymentId", updatePayment);
router.delete("/:paymentId", deletePayment);

export default router;
