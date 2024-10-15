"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountOfCartItems = exports.updatePaymentByUserId = exports.deleteCartItemById = exports.updateCartItem = exports.getCartItemById = exports.addCartItem = exports.getAllCartItems = void 0;
const databaseConnection_1 = require("../../config/databaseConnection");
// Fetch all cart items for a user with pagination
const getAllCartItems = async (userId, limit, offset) => {
    const query = `
    SELECT 
      c.created_at AS created_at,
      c.id AS cart_id, 
      c.food_id, 
      c.user_id, 
      c.quantity, 
      c.updated_at,
      f.id AS food_id,
      f.name AS food_name,
      f.price,
      f.discount_price,
      f.description,
      f.perma_link,
      f.ingredients,
      f.package_items_count,
      f.weight,
      f.unit,
      f.sku_code,
      f.barcode,
      f.cgst,
      f.sgst,
      f.track_inventory,
      f.featured,
      f.deliverable,
      f.restaurant_id,
      f.category_id,
      f.subcategory_id,
      f.product_type_id,
      f.hub_id,
      f.locality_id,
      f.product_brand_id,
      f.weightage,
      f.status,
      f.food_locality
    FROM 
      carts c
    JOIN 
      foods f ON c.food_id = f.id
    WHERE 
      c.user_id = ?
    ORDER BY c.created_at DESC
    LIMIT ? OFFSET ?; 
  `;
    const [rows] = await databaseConnection_1.db.promise().query(query, [userId, limit, offset]);
    return rows.map(row => ({
        id: row.cart_id,
        food_id: row.food_id,
        user_id: row.user_id,
        quantity: row.quantity,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        food: {
            id: row.food_id,
            name: row.food_name,
            price: row.price,
            discountPrice: row.discount_price,
            description: row.description,
            permaLink: row.perma_link,
            ingredients: row.ingredients,
            packageItemsCount: row.package_items_count,
            weight: row.weight,
            unit: row.unit,
            skuCode: row.sku_code,
            barcode: row.barcode,
            cgst: row.cgst,
            sgst: row.sgst,
            trackInventory: row.track_inventory,
            featured: row.featured,
            deliverable: row.deliverable,
            restaurantId: row.restaurant_id,
            categoryId: row.category_id,
            subcategoryId: row.subcategory_id,
            productTypeId: row.product_type_id,
            hubId: row.hub_id,
            localityId: row.locality_id,
            productBrandId: row.product_brand_id,
            weightage: row.weightage,
            status: row.status,
            foodLocality: row.food_locality
        }
    }));
};
exports.getAllCartItems = getAllCartItems;
// Add a new cart item and handle all related table insertions
const addCartItem = async (itemData) => {
    const { foodId, userId, quantity } = itemData;
    const cartSql = `
    INSERT INTO carts (food_id, user_id, quantity, created_at, updated_at) 
    VALUES (?, ?, ?, NOW(), NOW());
  `;
    const cartValues = [foodId, userId, quantity];
    try {
        // Insert into carts table
        const [cartResult] = await databaseConnection_1.db.promise().query(cartSql, cartValues);
        // Insert into orders table
        const orderSql = `
      INSERT INTO orders (
        user_id, order_type, order_date, order_status_id, tax, delivery_fee, active, is_wallet_deduct, created_at, updated_at
      ) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, NOW(), NOW());
    `;
        const orderValues = [userId, 2, 4, 0.00, 0.00, 1, 1];
        const [orderResult] = await databaseConnection_1.db.promise().query(orderSql, orderValues);
        const orderId = orderResult.insertId;
        // Insert into order_logs table
        const orderLogSql = `
      INSERT INTO order_logs (
        order_date, user_id, order_id, product_id, locality_id, delivery_boy_id, is_created, logs, created_at, updated_at
      ) VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;
        const orderLogValues = [userId, orderId, foodId, 1, 1, 1, "Stock Available, Order Created"];
        await databaseConnection_1.db.promise().query(orderLogSql, orderLogValues);
        // Insert into order_combos table
        const orderComboSql = `
      INSERT INTO order_combos (order_id, price, quantity,combo_id, created_at, updated_at) 
      VALUES (?, (SELECT price FROM foods WHERE id = ?), ?,2, NOW(), NOW());
    `;
        const orderComboValues = [orderId, foodId, quantity];
        const [orderComboResult] = await databaseConnection_1.db.promise().query(orderComboSql, orderComboValues);
        const orderComboId = orderComboResult.insertId;
        // Insert into order_combo_details table
        const orderComboDetailSql = `
      INSERT INTO order_combo_details (order_combo_id, order_id, product_id, created_at, updated_at) 
      VALUES (?, ?, ?, NOW(), NOW());
    `;
        const orderComboDetailValues = [orderComboId, orderId, foodId];
        await databaseConnection_1.db.promise().query(orderComboDetailSql, orderComboDetailValues);
        return cartResult;
    }
    catch (error) {
        console.error("SQL Error:", error);
        throw new Error("Failed to add cart item and related records.");
    }
};
exports.addCartItem = addCartItem;
// Fetch a cart item by ID
const getCartItemById = async (id) => {
    const query = `
    SELECT 
      c.created_at AS created_at,
      c.id AS cart_id, 
      c.food_id, 
      c.user_id, 
      c.quantity, 
      c.updated_at,
      f.id AS food_id,
      f.name AS food_name,
      f.price,
      f.discount_price,
      f.description,
      f.perma_link,
      f.ingredients,
      f.package_items_count,
      f.weight,
      f.unit,
      f.sku_code,
      f.barcode,
      f.cgst,
      f.sgst,
      f.track_inventory,
      f.featured,
      f.deliverable,
      f.restaurant_id,
      f.category_id,
      f.subcategory_id,
      f.product_type_id,
      f.hub_id,
      f.locality_id,
      f.product_brand_id,
      f.weightage,
      f.status,
      f.food_locality
    FROM 
      carts c
    JOIN 
      foods f ON c.food_id = f.id
    WHERE 
      c.id = ?;
  `;
    const [rows] = await databaseConnection_1.db.promise().query(query, [id]);
    if (rows.length === 0) {
        return null; // No item found
    }
    const row = rows[0];
    return {
        id: row.cart_id,
        food_id: row.food_id,
        user_id: row.user_id,
        quantity: row.quantity,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        food: {
            id: row.food_id,
            name: row.food_name,
            price: row.price,
            discountPrice: row.discount_price,
            description: row.description,
            permaLink: row.perma_link,
            ingredients: row.ingredients,
            packageItemsCount: row.package_items_count,
            weight: row.weight,
            unit: row.unit,
            skuCode: row.sku_code,
            barcode: row.barcode,
            cgst: row.cgst,
            sgst: row.sgst,
            trackInventory: row.track_inventory,
            featured: row.featured,
            deliverable: row.deliverable,
            restaurantId: row.restaurant_id,
            categoryId: row.category_id,
            subcategoryId: row.subcategory_id,
            productTypeId: row.product_type_id,
            hubId: row.hub_id,
            localityId: row.locality_id,
            productBrandId: row.product_brand_id,
            weightage: row.weightage,
            status: row.status,
            foodLocality: row.food_locality
        }
    };
};
exports.getCartItemById = getCartItemById;
// Update a cart item
const updateCartItem = async (id, quantity) => {
    const sql = `
    UPDATE carts
    SET quantity = ?
    WHERE id = ?;
  `;
    const [result] = await databaseConnection_1.db.promise().query(sql, [quantity, id]);
    if (result.affectedRows === 0) {
        throw new Error("Failed to update cart item or item not found.");
    }
};
exports.updateCartItem = updateCartItem;
// Delete a cart item by ID
const deleteCartItemById = async (id) => {
    const sql = `
    DELETE FROM carts 
    WHERE id = ?;
  `;
    await databaseConnection_1.db.promise().query(sql, [id]);
};
exports.deleteCartItemById = deleteCartItemById;
const updatePaymentByUserId = async (userId, totalAmount) => {
    const selectSql = `
    SELECT * FROM payments 
    WHERE user_id = ?;
  `;
    const insertSql = `
    INSERT INTO payments (user_id, price, updated_at) 
    VALUES (?, ?, NOW());
  `;
    const updateSql = `
    UPDATE payments
    SET price = ?, updated_at = NOW()
    WHERE user_id = ?;
  `;
    const [rows] = await databaseConnection_1.db.promise().query(selectSql, [userId]);
    try {
        if (rows.length > 0) {
            await databaseConnection_1.db.promise().query(updateSql, [totalAmount, userId]);
        }
        else {
            await databaseConnection_1.db.promise().query(insertSql, [userId, totalAmount]);
        }
    }
    catch (error) {
        console.error("Error updating or inserting payment:", error);
        throw new Error("Failed to update or insert payment.");
    }
};
exports.updatePaymentByUserId = updatePaymentByUserId;
const getCountOfCartItems = async (userId) => {
    const query = `
    SELECT COUNT(*) AS total
    FROM carts
    WHERE user_id = ?;
  `;
    const [rows] = await databaseConnection_1.db.promise().query(query, [userId]);
    return rows[0].total;
};
exports.getCountOfCartItems = getCountOfCartItems;
