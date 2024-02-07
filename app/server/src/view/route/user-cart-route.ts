import express from "express";
import UserCartController from "../../lib/controller/user-cart-controller";

const router = express.Router();
const cartController = new UserCartController();

router.get("/", cartController.show);
router.post("/", cartController.update);

export default router;
