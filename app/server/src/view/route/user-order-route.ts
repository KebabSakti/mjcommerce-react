import express from "express";
import UserOrderController from "../../lib/controller/user-order-controller";

const router = express.Router();
const orderController = new UserOrderController();

router.post("/", orderController.create);

export default router;
