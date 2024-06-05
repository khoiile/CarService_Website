import express from "express";
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllSchedules);
router.get("/:scheduleId", getScheduleById);
router.post("/", createSchedule);
router.put("/:scheduleId", updateSchedule);
router.delete("/:scheduleId", deleteSchedule);

export default router;
