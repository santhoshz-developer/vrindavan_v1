// controllers/orders/routeOrdersController.ts
import { Request, Response } from 'express';
import { getAllRouteOrders } from '../../models/orders/routeOrdersModel';
import { createResponse } from '../../utils/responseHandler';

// Get all orders
export const getRouteOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllRouteOrders();
    res.status(200).json(createResponse(200, 'Orders fetched successfully', orders));
  } catch (error) {
    res.status(500).json(createResponse(500, 'Error fetching orders', error));
  }
};
