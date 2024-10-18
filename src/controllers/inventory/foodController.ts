import { Request, Response } from "express";
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../../models/inventory/foodModel";
import { createResponse } from "../../utils/responseHandler";

// Get all foods
// Get all foods
export const fetchAllFoods = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  try {
    const { status, categoryId, subcategoryId, searchTerm } = req.query;
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;

    const filters = {
      status: status !== undefined ? status === "true" : undefined,
      categoryId: categoryId ? parseInt(categoryId as string) : undefined,
      subcategoryId: subcategoryId
        ? parseInt(subcategoryId as string)
        : undefined,
      searchTerm: searchTerm ? searchTerm.toString() : undefined,
    };

    const { foods, totalCount } = await getAllFoods(filters, limit, offset);

    
    const foodsResponse = foods.map((food) => ({
      food_id: food.id,
      food_name: food.name,
      price: food.price,
      discount_price: food.discount_price,
      description: food.description ? food.description.replace(/<\/?[^>]+(>|$)/g, "") : null,
      ingredients: food.ingredients,
      package_items_count: food.package_items_count,
      weight: food.weight,
      unit: food.unit,
      sku_code: food.sku_code,
      barcode: food.barcode,
      cgst: food.cgst,
      sgst: food.sgst,
      subscription_type: food.subscription_type,
      track_inventory: food.track_inventory,
      featured: food.featured,
      deliverable: food.deliverable,
      restaurant_id: food.restaurant_id,
      category_id: food.category_id,
      subcategory_id: food.subcategory_id,
      product_type_id: food.product_type_id,
      hub_id: food.hub_id,
      locality_id: food.locality_id,
      product_brand_id: food.product_brand_id,
      weightage: food.weightage,
      status: food.status,
      created_at: food.created_at,
      updated_at: food.updated_at,
      
      // All columns from media table
      media: food.media
        ? food.media.map((item) => ({
            media_id: item.id,
            model_type: item.model_type,
            model_id: item.model_id,
            uuid: item.uuid,
            collection_name: item.collection_name,
            name: item.name,
            file_name: item.file_name,
            mime_type: item.mime_type,
            disk: item.disk,
            conversions_disk: item.conversions_disk,
            size: item.size,
            manipulations: item.manipulations,
            custom_properties: item.custom_properties,
            generated_conversions: item.generated_conversions,
            responsive_images: item.responsive_images,
            order_column: item.order_column,
            created_at: item.created_at,
            updated_at: item.updated_at,
            original_url: item.original_url,
          }))
        : [],
    }));

    return res.status(200).json({
      statusCode: 200,
      message: "Foods fetched successfully",
      data: {
        foods: foodsResponse,
        totalCount,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
    return res
      .status(500)
      .json(createResponse(500, "Error fetching foods", error.message));
  }
};


// Get food by ID
export const fetchFoodById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const foodId = parseInt(req.params.id);

  if (isNaN(foodId)) {
    return res.status(400).json(createResponse(400, "Invalid food ID"));
  }

  try {
    const { food } = await getFoodById(foodId);

    if (food) {
      const foodResponse = {
        id: food.id,
        name: food.name,
        price: food.price,
        discount_price: food.discount_price,
        description: food.description,
        ingredients: food.ingredients,
        package_items_count: food.package_items_count,
        weight: food.weight,
        unit: food.unit,
        sku_code: food.sku_code,
        barcode: food.barcode,
        cgst: food.cgst,
        sgst: food.sgst,
        subscription_type: food.subscription_type,
        track_inventory: food.track_inventory,
        featured: food.featured,
        deliverable: food.deliverable,
        restaurant_id: food.restaurant_id,
        category_id: food.category_id,
        subcategory_id: food.subcategory_id,
        product_type_id: food.product_type_id,
        hub_id: food.hub_id,
        locality_id: food.locality_id,
        product_brand_id: food.product_brand_id,
        weightage: food.weightage,
        status: food.status,
        created_at: food.created_at,
        updated_at: food.updated_at,
        media: food.media.map(m => ({
          id: m.id,
          model_type: m.model_type,
          model_id: m.model_id,
          uuid: m.uuid,
          collection_name: m.collection_name,
          name: m.name,
          file_name: m.file_name,
          mime_type: m.mime_type,
          disk: m.disk,
          conversions_disk: m.conversions_disk,
          size: m.size,
          manipulations: m.manipulations,
          custom_properties: m.custom_properties,
          generated_conversions: m.generated_conversions,
          responsive_images: m.responsive_images,
          order_column: m.order_column,
          created_at: m.created_at,
          updated_at: m.updated_at,
          original_url: m.original_url,
        })),
      };

      const foodsData=[foodResponse]

      return res.status(200).json(createResponse(200, "Food fetched successfully", { foods: foodsData }));
    } else {
      return res.status(404).json(createResponse(404, "Food not found"));
    }
  } catch (error) {
    console.error("Error fetching food:", error);
    return res.status(500).json(createResponse(500, "Error fetching food", error.message));
  }
};


// Create food
export const addFood = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  try {
    const foodData = req.body;
    const newFood = await createFood(foodData);

    return res.status(201).json({
      statusCode: 201,
      message: "Food created successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    return res
      .status(500)
      .json(createResponse(500, "Error creating food", error.message));
  }
};

// Update food
export const modifyFood = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const foodId = parseInt(req.params.id);
  if (isNaN(foodId)) {
    return res.status(400).json(createResponse(400, "Invalid food ID"));
  }

  try {
    const foodData = req.body;
    const updatedFood = await updateFood(foodId, foodData);

    if (updatedFood) {
      return res.status(200).json({
        statusCode: 200,
        message: "Food updated successfully",
        data: {
          updateFood_id: updatedFood.id,
        },
      });
    } else {
      return res.status(404).json(createResponse(404, "Food not found"));
    }
  } catch (error) {
    console.error("Error updating food:", error);
    return res
      .status(500)
      .json(createResponse(500, "Error updating food", error.message));
  }
};

// Delete food
export const removeFood = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const foodId = parseInt(req.params.id);
  if (isNaN(foodId)) {
    return res.status(400).json(createResponse(400, "Invalid food ID"));
  }

  try {
    const deleted = await deleteFood(foodId);
    if (deleted) {
      return res.status(200).json({
        statusCode: 200,
        message: "Food deleted successfully",
        data: {
          deleteFood_id: foodId,
        },
      });
    } else {
      return res.status(404).json(createResponse(404, "Food not found"));
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return res
      .status(500)
      .json(createResponse(500, "Error deleting food", error.message));
  }
};
