import express, { Request, Response } from "express";
import CartController from "../../lib/controller/cart-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const cartController = new CartController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.app.locals.id;
    const cart = await cartController.getCart(userId);

    res.json(cart);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
