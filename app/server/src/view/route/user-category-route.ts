import express, { Request, Response } from "express";
import UserCategoryController from "../../lib/controller/user-category-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const categoryController = new UserCategoryController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await categoryController.getCategories();

    res.json(categories);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
