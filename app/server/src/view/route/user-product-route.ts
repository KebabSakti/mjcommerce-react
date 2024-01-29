import express, { Request, Response } from "express";
import UserProductController from "../../lib/controller/user-product-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const productController = new UserProductController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await productController.getFilteredProduct(req.query);

    res.json(data);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await productController.getProductDetail(req.params.id);

    res.json(data);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
