import express, { Request, Response } from "express";
import { Failure } from "../../lib/helper/failure";
import UserAuthController from "../../lib/controller/userAuthController";

const router = express.Router();
const userAuthController = new UserAuthController();

router.get("/guest", async (req: Request, res: Response) => {
  try {
    const authModel = await userAuthController.guest();
    req.app.locals.auth = authModel;

    res.json({ token: authModel.token });
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
