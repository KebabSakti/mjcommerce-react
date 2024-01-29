import express, { Request, Response } from "express";
import Joi from "joi";
import UserProductRatingController from "../../lib/controller/user-product-rating-controller";
import { BadRequest, Failure } from "../../lib/helper/failure";

const router = express.Router();
const productRatingController = new UserProductRatingController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      productId: Joi.string().required(),
    }).unknown();

    const { error } = schema.validate(req.query);

    if (error) {
      throw new BadRequest(error.message);
    }

    const productId = req.query.productId as string;
    const data = await productRatingController.getRating(productId, req.query);

    res.json(data);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
