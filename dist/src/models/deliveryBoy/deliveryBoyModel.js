"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeliveryBoyById = exports.updateDeliveryBoyById = exports.getDeliveryBoyById = exports.createDeliveryBoy = exports.getAllDeliveryBoys = void 0;
const databaseConnection_1 = require("../../config/databaseConnection");
const getAllDeliveryBoys = async (limit, offset, searchTerm) => {
    const searchCondition = searchTerm
        ? `WHERE name LIKE ? OR mobile LIKE ?`
        : '';
    const searchParams = searchTerm ? [`%${searchTerm}%`, `%${searchTerm}%`] : [];
    // Query for fetching delivery boys with LIMIT and OFFSET
    const [deliveryBoys] = await databaseConnection_1.db
        .promise()
        .query(`SELECT * FROM delivery_boys ${searchCondition} LIMIT ? OFFSET ?`, [...searchParams, limit, offset]);
    const [[totalCountRow]] = await databaseConnection_1.db
        .promise()
        .query(`SELECT COUNT(*) as totalCount FROM delivery_boys ${searchCondition}`, searchParams);
    const totalCount = totalCountRow.totalCount;
    return { deliveryBoys, totalCount };
};
exports.getAllDeliveryBoys = getAllDeliveryBoys;
// Create a new delivery boy
const createDeliveryBoy = async (userId, name, mobile, active, cashCollection, deliveryFee, totalOrders, earning, available, addressPickup, latitudePickup, longitudePickup) => {
    await databaseConnection_1.db
        .promise()
        .query("INSERT INTO delivery_boys (user_id, name, mobile, active, cash_collection, delivery_fee, total_orders, earning, available, addressPickup, latitudePickup, longitudePickup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [userId, name, mobile, active ? 1 : 0, cashCollection ? 1 : 0, deliveryFee, totalOrders, earning, available ? 1 : 0, addressPickup, latitudePickup, longitudePickup]);
};
exports.createDeliveryBoy = createDeliveryBoy;
// Fetch delivery boy by ID
const getDeliveryBoyById = async (id) => {
    const [rows] = await databaseConnection_1.db
        .promise()
        .query("SELECT * FROM delivery_boys WHERE id = ?", [id]);
    return rows;
};
exports.getDeliveryBoyById = getDeliveryBoyById;
// Update delivery boy by ID
const updateDeliveryBoyById = async (id, userId, name, mobile, active, cashCollection, deliveryFee, totalOrders, earning, available, addressPickup, latitudePickup, longitudePickup) => {
    await databaseConnection_1.db
        .promise()
        .query("UPDATE delivery_boys SET user_id = ?, name = ?, mobile = ?, active = ?, cash_collection = ?, delivery_fee = ?, total_orders = ?, earning = ?, available = ?, addressPickup = ?, latitudePickup = ?, longitudePickup = ? WHERE id = ?", [userId, name, mobile, active ? 1 : 0, cashCollection ? 1 : 0, deliveryFee, totalOrders, earning, available ? 1 : 0, addressPickup, latitudePickup, longitudePickup, id]);
};
exports.updateDeliveryBoyById = updateDeliveryBoyById;
// Delete delivery boy by ID
const deleteDeliveryBoyById = async (id) => {
    await databaseConnection_1.db
        .promise()
        .query("DELETE FROM delivery_boys WHERE id = ?", [id]);
};
exports.deleteDeliveryBoyById = deleteDeliveryBoyById;
