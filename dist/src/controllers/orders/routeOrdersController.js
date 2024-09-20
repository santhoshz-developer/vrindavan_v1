"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteOrders = void 0;
const routeOrdersModel_1 = require("../../models/orders/routeOrdersModel");
const responseHandler_1 = require("../../utils/responseHandler");
// Get all orders
const getRouteOrders = async (req, res) => {
    try {
        const orders = await (0, routeOrdersModel_1.getAllRouteOrders)();
        res.status(200).json((0, responseHandler_1.createResponse)(200, 'Orders fetched successfully', orders));
    }
    catch (error) {
        res.status(500).json((0, responseHandler_1.createResponse)(500, 'Error fetching orders', error));
    }
};
exports.getRouteOrders = getRouteOrders;