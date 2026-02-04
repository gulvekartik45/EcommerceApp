import { Router } from "express";
import { createOrder, getMyOrders, getAllOrders } from "../controller/orderController.js";
import authentication, { authorization } from "../middleware/authentication.js";

const router = Router();

router.post("/", authentication, createOrder);
router.get("/my", authentication, getMyOrders);
router.get("/", authentication, authorization, getAllOrders);

export default router;
