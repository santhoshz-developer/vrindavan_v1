import express from 'express';
import {
  getCustomers,
  addCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer
} from '../../controllers/customerController/customerController';
import {
  customerValidation,
  customerIdValidation,
  validate
} from '../../validation/customerValidation/customerValidation';

const router = express.Router();

router.get("/", getCustomers);

router.post("/", customerValidation, validate, addCustomer);

router.get("/:id", customerIdValidation, validate, getCustomer);

router.put("/:id", customerIdValidation, customerValidation, validate, updateCustomer);

router.delete("/:id", customerIdValidation, validate, deleteCustomer);

export default router;
