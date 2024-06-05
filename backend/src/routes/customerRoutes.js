import { Router } from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCartForCustomerById,
  createCartForCustomer,
  updateCartForCustomer,
  deleteCartForCustomer,
  getOrdersForCustomer,
  createOrderForCustomer,
  updateOrderForCustomer,
  deleteOrderForCustomer,
} from "../controllers/CustomerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllCustomers);
router.get("/:customerId", getCustomerById);
router.post("/", createCustomer);
router.put("/:customerId", updateCustomer);
router.delete("/:customerId", deleteCustomer);

router.get("/:customerId/carts/:cartId", getCartForCustomerById);
router.post("/:customerId/carts", createCartForCustomer);
router.put("/:customerId/carts/:cartId", updateCartForCustomer);
router.delete("/:customerId/carts/:cartId", deleteCartForCustomer);

router.get("/:customerId/orders", getOrdersForCustomer);
router.post("/:customerId/orders", createOrderForCustomer);
router.put("/:customerId/orders/:orderId", updateOrderForCustomer);
router.delete("/:customerId/orders/:orderId", deleteOrderForCustomer);

export default router;
