import { Router } from "express";
import {
  getMechanicByEmail,
  getMechanicByName,
  createMechanic,
  getAllMechanics,
  updateMechanic,
  deleteMechanic,
} from "../controllers/mechanicController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/email/:email", getMechanicByEmail);
router.get("/name/:name", getMechanicByName);
router.post("/", createMechanic);
router.get("/", getAllMechanics);
router.put("/:mechanicId", updateMechanic);
router.delete("/:mechanicId", deleteMechanic);

export default router;
