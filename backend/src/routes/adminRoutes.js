import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getServiceById,
  updateService,
} from "../controllers/serviceController.js";
import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/CustomerController.js";
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/customers/:customerId", getCustomerById);
router.get("/customers", getAllCustomers);
router.get("/services/:serviceId", getServiceById);
router.put("/services/:serviceId", updateService);

router.get("/", getAllAdmins);
router.get("/:adminId", getAdminById);
router.post("/", createAdmin);
router.put("/:adminId", updateAdmin);
router.delete("/:adminId", deleteAdmin);

export default router;
