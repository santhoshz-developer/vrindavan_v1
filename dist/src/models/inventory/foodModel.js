"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFoodById = exports.getAllFoods = void 0;
const databaseConnection_1 = require("../../config/databaseConnection");
const getAllFoods = async () => {
    const [rows] = await databaseConnection_1.db
        .promise()
        .execute("SELECT * FROM foods");
    return rows;
};
exports.getAllFoods = getAllFoods;
const getFoodById = async (id) => {
    const [rows] = await databaseConnection_1.db
        .promise()
        .execute("SELECT * FROM foods WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
};
exports.getFoodById = getFoodById;
const createFood = async (foodData) => {
    const query = `
        INSERT INTO foods (name, price, discount_price, description, product_type_id, 
        product_brand_id, locality_id, weightage, image, unit, sku_code, barcode, 
        cgst, sgst, category_id, subcategory_id, featured, track_inventory, restaurant_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        foodData.name,
        foodData.price,
        foodData.discount_price ?? null,
        foodData.description ?? null,
        foodData.product_type_id,
        foodData.product_brand_id,
        foodData.locality_id ?? null,
        foodData.weightage,
        foodData.image ?? null,
        foodData.unit_size ?? null,
        foodData.sku_code ?? null,
        foodData.barcode ?? null,
        foodData.cgst ?? null,
        foodData.sgst ?? null,
        foodData.category_id,
        foodData.subcategory_id ?? null,
        foodData.featured ? 1 : 0,
        foodData.track_inventory ? 1 : 0,
        foodData.restaurant_id,
        foodData.status ? 1 : 0,
    ];
    const [result] = await databaseConnection_1.db.promise().execute(query, values);
    return { id: result.insertId, ...foodData };
};
exports.createFood = createFood;
const updateFood = async (id, foodData) => {
    const query = `
        UPDATE foods SET name = ?, price = ?, discount_price = ?, description = ?, 
        product_type_id = ?, product_brand_id = ?, locality_id = ?, weightage = ?, 
        image = ?, unit = ?, sku_code = ?, barcode = ?, cgst = ?, sgst = ?, 
        category_id = ?, subcategory_id = ?, featured = ?, subscription_type = ?, 
        track_inventory = ?, restaurant_id = ?, status = ? WHERE id = ?
    `;
    const values = [
        foodData.name,
        foodData.price,
        foodData.discount_price ?? null,
        foodData.description ?? null,
        foodData.product_type_id,
        foodData.product_brand_id,
        foodData.locality_id ?? null,
        foodData.weightage,
        foodData.image ?? null,
        foodData.unit_size ?? null,
        foodData.sku_code ?? null,
        foodData.barcode ?? null,
        foodData.cgst ?? null,
        foodData.sgst ?? null,
        foodData.category_id,
        foodData.subcategory_id,
        foodData.featured ?? false,
        foodData.subscription ?? false,
        foodData.track_inventory ?? false,
        foodData.restaurant_id,
        foodData.status ?? false,
        id,
    ];
    const [result] = await databaseConnection_1.db.promise().execute(query, values);
    return result.affectedRows > 0 ? { id, ...foodData } : null;
};
exports.updateFood = updateFood;
const deleteFood = async (id) => {
    const [result] = await databaseConnection_1.db
        .promise()
        .execute("DELETE FROM foods WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
exports.deleteFood = deleteFood;