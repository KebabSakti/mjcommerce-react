import express, { Request, Response } from "express";
import { Failure } from "../../lib/helper/failure";
import UserAuthController from "../../lib/controller/user-auth-controller";

const router = express.Router();
const userAuthController = new UserAuthController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const token = await userAuthController.guest();
    const userId = userAuthController.decrypt(token);
    req.app.locals.id = userId;

    res.json({ token: token });
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
