import express, { Request, Response } from "express";
import Joi from "joi";
import ProductController from "../../lib/controller/product-controller";
import { BadRequest, Failure } from "../../lib/helper/failure";
import { ProductReadParameter } from "../../lib/model/product-model";

const router = express.Router();
const productController = new ProductController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      skip: Joi.number().required(),
      take: Joi.number().required(),
    });

    const { error } = schema.validate(req.query, {
      allowUnknown: true,
    });

    if (error) {
      throw new BadRequest();
    }

    const param: ProductReadParameter = {
      filter: req.query,
      paginate: {
        skip: parseInt(req.query.skip as any),
        take: parseInt(req.query.take as any),
      },
      sort: {
        field: req.query.field as any,
        direction: req.query.direction as any,
      },
    };

    const data = await productController.getFilteredProduct(param);

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
