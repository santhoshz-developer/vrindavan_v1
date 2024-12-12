import express from "express";
import {
  getDeliveryBoysWithLocalities,
  addDeliveryBoy,
  getDeliveryBoy,
  updateDeliveryBoy,
  deleteDeliveryBoy,
  deleteLocalitiesForDeliveryBoy,
} from "../../controllers/deliveryBoy/deliveryBoyController";
import { verifyDeviceToken } from "../../middlewares/authMiddleware";

const router = express.Router();

// Define routes for delivery boys
router.get("/", verifyDeviceToken, getDeliveryBoysWithLocalities);
router.post("/", verifyDeviceToken, addDeliveryBoy);
router.get("/:id", verifyDeviceToken, getDeliveryBoy);
router.put("/:id", updateDeliveryBoy, verifyDeviceToken);
router.delete("/:id", verifyDeviceToken, deleteDeliveryBoy);
router.delete("/localities/:deliveryBoyId", verifyDeviceToken, deleteLocalitiesForDeliveryBoy);

export default router;
