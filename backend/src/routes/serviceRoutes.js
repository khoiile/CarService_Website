import { Router } from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  createServices,
  createScheduleForService,
  getAllSchedulesByServiceId,
  updateScheduleByServiceId,
  deleteScheduleByServiceId,
} from "../controllers/serviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllServices);
router.get("/:serviceId", getServiceById);
router.post("/", authMiddleware, createService);
router.put("/:serviceId", authMiddleware, updateService);
router.delete("/:serviceId", authMiddleware, deleteService);
router.post("/bulk", authMiddleware, createServices);

router.post("/:serviceId/schedules", authMiddleware, createScheduleForService);
router.get("/:serviceId/schedules", authMiddleware, getAllSchedulesByServiceId);
router.put(
  "/:serviceId/schedules/:scheduleId",
  authMiddleware,
  updateScheduleByServiceId
);
router.delete(
  "/:serviceId/schedules/:scheduleId",
  authMiddleware,
  deleteScheduleByServiceId
);

export default router;
