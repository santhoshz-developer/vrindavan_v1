import { db } from "../../config/databaseConnection";
import { RowDataPacket } from "mysql2";

interface BillingHistoryItem {
    order_log_id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    order_id: number;
    order_type: string;
    order_date: Date;
    food_id: number;
    food_name: string;
    food_price: number;
    food_description: string;
    route_id: number;
    hub_id: number;
    locality_id: number;
    delivery_boy_id: number;
    delivery_boy_name: string;
    delivery_boy_mobile: string;
    created_at: Date;
    updated_at: Date;
}

export const getBillingHistory = async (userId: number, page: number, limit: number): Promise<BillingHistoryItem[]> => {
    const offset = (page - 1) * limit; 
    const query = `
        SELECT 
            ol.id AS order_log_id,
            u.id AS user_id, 
            u.name AS user_name, 
            u.email AS user_email, 
            u.phone AS user_phone,
            o.id AS order_id, 
            o.order_type, 
            o.order_date,
            f.id AS food_id, 
            f.name AS food_name, 
            f.price AS food_price, 
            f.description AS food_description,
            o.route_id,
            o.hub_id,
            o.locality_id,
            o.delivery_boy_id,
            db.name AS delivery_boy_name,
            db.mobile AS delivery_boy_mobile,
            ol.created_at AS created_at,
            ol.updated_at AS updated_at
        FROM 
            order_logs ol
        LEFT JOIN 
            users u ON ol.user_id = u.id
        LEFT JOIN 
            orders o ON ol.order_id = o.id
        LEFT JOIN 
            foods f ON ol.product_id = f.id
        LEFT JOIN 
            delivery_boys db ON o.delivery_boy_id = db.id
        WHERE 
            ol.user_id = ?
        ORDER BY 
            ol.created_at DESC
        LIMIT ? OFFSET ?;
    `;

    try {
        const [rows]: [RowDataPacket[], any] = await db.promise().query(query, [userId, limit, offset]);
        
        return rows.map(row => ({
            order_log_id: row.order_log_id,
            user_id: row.user_id,
            user_name: row.user_name,
            user_email: row.user_email,
            user_phone: row.user_phone,
            order_id: row.order_id,
            order_type: row.order_type,
            order_date: row.order_date,
            food_id: row.food_id,
            food_name: row.food_name,
            food_price: row.food_price,
            food_description: row.food_description,
            route_id: row.route_id,
            hub_id: row.hub_id,
            locality_id: row.locality_id,
            delivery_boy_id: row.delivery_boy_id,
            delivery_boy_name: row.delivery_boy_name,
            delivery_boy_mobile: row.delivery_boy_mobile,
            created_at: row.created_at,
            updated_at: row.updated_at,
        }));
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Database query failed");
    }
};

// Fetch total count of billing history for a user
export const getTotalBillingHistoryCount = async (userId: number): Promise<number> => {
    const query = `
        SELECT 
            COUNT(*) as total
        FROM 
            order_logs ol
        WHERE 
            ol.user_id = ?;
    `;

    try {
        const [rows]: [RowDataPacket[], any] = await db.promise().query(query, [userId]);
        return rows[0].total;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Failed to get total billing history count");
    }
};
