import express from "express";
import authLoginRoutes from "./routes/authLogin/authLogin";
import categoryRoutes from "./routes/inventory/categoryRoutes";
import subcategoryRoutes from "./routes/inventory/subcategoryRoutes";
import foodRoutes from "./routes/inventory/foodRoutes";
import productTypeRoutes from "./routes/inventory/productTypeRoutes";
import productBrandRoutes from "./routes/inventory/productBrandRoutes";
import customerRoutes from "./routes/customer/customerRoutes";
import truckRoutes from "./routes/localities/truckRoutes";
import hubsRoutes from "./routes/localities/hubsRoutes";
import localityRoutes from "./routes/localities/localityRoutes";
import faqCategoryRoutes from "./routes/faqs/faqCategoryRoutes";
import faqsRoutes from "./routes/faqs/faqsRoutes";
import deliveryBoyRoutes from "./routes/deliveryBoy/deliveryBoyRoutes";
import commissionRoutes from "./routes/deliveryBoy/commissionRoutes";

const router = express.Router();

// Auth Login
router.use("/auth", authLoginRoutes);

// Inventory Routes
router.use("/categories", categoryRoutes);
router.use("/subcategories", subcategoryRoutes);
router.use("/foods", foodRoutes);
router.use("/product_brands", productBrandRoutes);
router.use("/product_types", productTypeRoutes);

// Customers
router.use("/customers", customerRoutes);

// Localities
router.use("/truck_routes", truckRoutes);
router.use("/hubs", hubsRoutes);
router.use("/localities", localityRoutes);

// faqs
router.use("/faqs_categories", faqCategoryRoutes);
router.use("/faqs", faqsRoutes);

// deliveryBoys
router.use("/delivery_boys",deliveryBoyRoutes)
router.use("/commissions", commissionRoutes);

export default router;
