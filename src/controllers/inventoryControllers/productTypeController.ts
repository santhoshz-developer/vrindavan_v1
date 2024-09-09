import { Request, Response } from "express";
import {
  getAllProductTypes,
  createProductType,
  getProductTypeById as fetchProductTypeById,
  updateProductTypeById,
  deleteProductTypeById
} from "../../models/inventoryModels/productTypeModel";
import { createResponse } from "../../utils/responseHandler";

export const getProductTypes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productTypes = await getAllProductTypes();
    res
      .status(200)
      .json(
        createResponse(200, "Product types fetched successfully", productTypes)
      );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Error fetching product types", error));
  }
};

export const addProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, weightage } = req.body;
  try {
    await createProductType(name, weightage);
    res
      .status(201)
      .json(createResponse(201, "Product type created successfully"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Error creating product type", error));
  }
};

export const getProductTypeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const productType = await fetchProductTypeById(Number(id));
    if (productType.length === 0) {
      res.status(404).json(createResponse(404, "Product type not found"));
      return;
    }
    res.json(createResponse(200, "Product type fetched successfully", productType[0]));
  } catch (error) {
    res.status(500).json(createResponse(500, "Error fetching product type", error));
  }
};

export const updateProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, weightage } = req.body;
  try {
    await updateProductTypeById(Number(id), name, weightage);
    res.status(200).json(createResponse(200, "Product type updated successfully"));
  } catch (error) {
    res.status(500).json(createResponse(500, "Error updating product type", error));
  }
};

export const deleteProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteProductTypeById(Number(id));
    res.status(200).json(createResponse(200, "Product type deleted successfully"));
  } catch (error) {
    res.status(500).json(createResponse(500, "Error deleting product type", error));
  }
};