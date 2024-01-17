import express, { Request, Response } from "express";
import { ControllerData } from "../../lib/config/type";
import CategoryController from "../../lib/controller/category-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query.parsedQuery as ControllerData;
    const categories = await categoryController.getCategories(query);

    res.json(categories);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
