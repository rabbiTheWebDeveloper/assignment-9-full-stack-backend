import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getAllOrderFilterDates,
  getAllOrderSummarize,
  getCustomerList,
  getOrderById,
  getOrderByOrderSearch,
  getOrderByOrderStatus,
  getRecentOrder,
  updateOrderStatus,
  updateOrderTraking,
} from "./oder.controller";

const router: Router = Router();
router.get("/order-list", getAllOrder);
router.get("/recent-order", getRecentOrder);
router.get("/customer-list", getCustomerList);
router.get("/order-list-summarize", getAllOrderSummarize);
router.get("/order-list/:id", getOrderById);
router.get("/search/:search", getOrderByOrderSearch);
router.get("/order-status-filter/:status", getOrderByOrderStatus);
router.post("/create-order", createOrder);
router.post("/order-status-update/:id", updateOrderStatus);
router.post("/order-tracking-update/:id", updateOrderTraking);
router.get("/order-filter/:date", getAllOrderFilterDates);

export default router;
