import { Request, Response } from "express";
import {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById
} from '../../models/customer/customerModel';
import { createResponse } from '../../utils/responseHandler';

// Fetch all customers with pagination and filters
// Fetch all customers with pagination and filters
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10, locality, status, searchTerm } = req.query;

  // Allow any positive integer for limit, defaulting to 10 if not specified
  const validLimit = Number(limit) > 0 ? Number(limit) : 10;

  try {
    const { customers, total, statusCount } = await getAllCustomers(
      Number(page),
      validLimit,
      locality?.toString(),
      status?.toString(),
      searchTerm?.toString()
    );

    const totalPages = Math.ceil(total / validLimit);

    res.status(200).json(createResponse(200, "Customers fetched successfully", {
      customers,
      total,
      totalPages,
      currentPage: Number(page),
      limit: validLimit,
      locality: locality || 'All',
      statusCount,
    }));
  } catch (error) {
    res.status(500).json(createResponse(500, "Error fetching customers", error));
  }
};



// Add a new customer
export const addCustomer = async (req: Request, res: Response): Promise<void> => {
  const { localityId, name, email, mobile, houseNo, completeAddress, status } = req.body;
  try {
    await createCustomer(localityId, name, email, mobile, houseNo, completeAddress, status);
    res.status(201).json(createResponse(201, "Customer created successfully"));
  } catch (error) {
    console.error("Error in addCustomer:", error); 
    res.status(500).json(createResponse(500, "Error creating customer", error.message));
  }
};

// Get customer by ID
export const getCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const customer = await getCustomerById(parseInt(id));
    if (!customer) {
      res.status(404).json(createResponse(404, "Customer not found"));
    } else {
      res.status(200).json(createResponse(200, "Customer fetched successfully", customer));
    }
  } catch (error) {
    res.status(500).json(createResponse(500, "Error fetching customer", error));
  }
};

// Update customer by ID
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { localityId, name, email, mobile, houseNo, completeAddress, status } = req.body;

  try {
    await updateCustomerById(
      parseInt(id),
      localityId,
      name,
      email,
      mobile,
      houseNo,
      completeAddress,
      status
    );
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete customer by ID
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteCustomerById(parseInt(id));
    res.status(200).json(createResponse(200, "Customer deleted successfully"));
  } catch (error) {
    res.status(500).json(createResponse(500, "Error deleting customer", error));
  }
};
