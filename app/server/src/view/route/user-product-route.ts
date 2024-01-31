import express from "express";
import UserProductController from "../../lib/controller/user-product-controller";

const router = express.Router();
const productController = new UserProductController();

router.get("/", productController.index);
router.get("/:id", productController.show);

export default router;
