"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commissionController_1 = require("../../controllers/deliveryBoy/commissionController");
const commissionValidation_1 = require("../../validation/deliveryBoy/commissionValidation");
const router = express_1.default.Router();
// Define routes for commissions
router.get("/", commissionController_1.getDetailedCommissions);
router.post("/", commissionValidation_1.commissionValidation, commissionValidation_1.validate, commissionController_1.addDetailedCommission);
router.get("/:id", commissionValidation_1.commissionIdValidation, commissionValidation_1.validate, commissionController_1.getDetailedCommission);
router.put("/:id", commissionValidation_1.commissionIdValidation, commissionValidation_1.commissionValidation, commissionValidation_1.validate, commissionController_1.updateDetailedCommission);
router.delete("/:id", commissionValidation_1.commissionIdValidation, commissionValidation_1.validate, commissionController_1.deleteDetailedCommission);
exports.default = router;