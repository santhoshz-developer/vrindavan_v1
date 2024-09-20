"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRouteOrders = void 0;
const databaseConnection_1 = require("../../config/databaseConnection");
const getAllRouteOrders = async () => {
    try {
        const [rows] = await databaseConnection_1.db.promise().query(`
     SELECT
        r1.id AS route_id,
        r1.name AS route_name,
        h.id AS hub_id,
        h.name AS hub_name,
        h.other_details AS hub_other_details,
        f.id AS food_id,
        f.name AS food_name,
        f.unit AS food_unit,
        fo.quantity AS food_quantity,
        pt.id AS product_type_id,
        pt.name AS product_type_name,
        pt.weightage AS product_type_weightage,
        pt.active AS product_type_active
      FROM orders o
      LEFT JOIN truck_routes r1 ON o.route_id = r1.id
      LEFT JOIN hubs h ON o.hub_id = h.id
      LEFT JOIN food_orders fo ON o.id = fo.order_id
      LEFT JOIN foods f ON fo.food_id = f.id
      LEFT JOIN product_types pt ON f.product_type_id = pt.id
      ORDER BY o.id, f.id;
    `);
        const structuredData = rows.map((row) => ({
            Route: row.route_name,
            Hub: row.hub_name,
            "Product Name": row.food_name,
            "Unit Size": row.food_unit,
            Quantity: row.food_quantity,
            "Product Type": {
                id: row.product_type_id,
                name: row.product_type_name,
                weightage: row.product_type_weightage,
                active: row.product_type_active
            }
        }));
        return structuredData;
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};
exports.getAllRouteOrders = getAllRouteOrders;