"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authLoginRoute_1 = __importDefault(require("./routes/authLogin/authLoginRoute"));
const categoryRoutes_1 = __importDefault(require("./routes/inventory/categoryRoutes"));
const subcategoryRoutes_1 = __importDefault(require("./routes/inventory/subcategoryRoutes"));
const productTypeRoutes_1 = __importDefault(require("./routes/inventory/productTypeRoutes"));
const productBrandRoutes_1 = __importDefault(require("./routes/inventory/productBrandRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customer/customerRoutes"));
const truckRoutes_1 = __importDefault(require("./routes/localities/truckRoutes"));
const hubsRoutes_1 = __importDefault(require("./routes/localities/hubsRoutes"));
const localityRouter_1 = __importDefault(require("./routes/localities/localityRouter"));
const faqCategoryRoutes_1 = __importDefault(require("./routes/faqs/faqCategoryRoutes"));
const faqsRoutes_1 = __importDefault(require("./routes/faqs/faqsRoutes"));
const deliveryBoyRoutes_1 = __importDefault(require("./routes/deliveryBoy/deliveryBoyRoutes"));
const commissionRoutes_1 = __importDefault(require("./routes/deliveryBoy/commissionRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orders/orderRoutes"));
const routeOrdersRoutes_1 = __importDefault(require("./routes/orders/routeOrdersRoutes"));
const hubOrdersRoutes_1 = __importDefault(require("./routes/orders/hubOrdersRoutes"));
const devliveryBoyOrders_1 = __importDefault(require("./routes/orders/devliveryBoyOrders"));
const foodRoutes_1 = __importDefault(require("./routes/inventory/foodRoutes"));
const bannerRoutes_1 = __importDefault(require("./routes/banner/bannerRoutes"));
const dealOfTheDayRoutes_1 = __importDefault(require("./routes/dealOfTheDay/dealOfTheDayRoutes"));
const addToCartsRoutes_1 = __importDefault(require("./routes/addToCard/addToCartsRoutes"));
const walletTransationsRoutes_1 = __importDefault(require("./routes/wallet/walletTransationsRoutes"));
const subscriptionsRoutes_1 = __importDefault(require("./routes/subscriptions/subscriptionsRoutes"));
const ordersRoutes_1 = __importDefault(require("./routes/orders-v1/ordersRoutes"));
const placeOrderRoutes_1 = __importDefault(require("./routes/placeOrder/placeOrderRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notification/notificationRoutes"));
const featureProductRoutes_1 = __importDefault(require("./routes/featureProduct/featureProductRoutes"));
const router = express_1.default.Router();
// Auth Login
router.use("/auth", authLoginRoute_1.default);
// Inventory Routes
router.use("/categories", categoryRoutes_1.default);
router.use("/subcategories", subcategoryRoutes_1.default);
router.use("/foods", foodRoutes_1.default);
router.use("/product_brands", productBrandRoutes_1.default);
router.use("/product_types", productTypeRoutes_1.default);
// Customers
router.use("/customers", customerRoutes_1.default);
// Localities
router.use("/truck_routes", truckRoutes_1.default);
router.use("/hubs", hubsRoutes_1.default);
router.use("/localities", localityRouter_1.default);
// faqs
router.use("/faqs_categories", faqCategoryRoutes_1.default);
router.use("/faqs", faqsRoutes_1.default);
// deliveryBoys
router.use("/delivery_boys", deliveryBoyRoutes_1.default);
router.use("/commissions", commissionRoutes_1.default);
// orders
router.use("/orderss", orderRoutes_1.default); //dummy
router.use("/route_orders", routeOrdersRoutes_1.default);
router.use("/hub_orders", hubOrdersRoutes_1.default);
router.use("/delivery_orders", devliveryBoyOrders_1.default);
//Banners
router.use("/banners", bannerRoutes_1.default);
//deal of the day
router.use("/deals", dealOfTheDayRoutes_1.default);
//AddToCarts
router.use("/cart", addToCartsRoutes_1.default);
//walletTransations
router.use("/wallet", walletTransationsRoutes_1.default);
//subscriptions
router.use("/subscriptions", subscriptionsRoutes_1.default);
//placeOrder
router.use("/placeOrder", placeOrderRoutes_1.default);
//order-v1
router.use("/orders", ordersRoutes_1.default);
//notifications
router.use("/notifications", notificationRoutes_1.default);
// feature_products
router.use("/feature_products", featureProductRoutes_1.default);
exports.default = router;
