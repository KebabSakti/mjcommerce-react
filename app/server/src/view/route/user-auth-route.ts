import express, { Request, Response } from "express";
import UserAuthController from "../../lib/controller/user-auth-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const userAuthController = new UserAuthController();

router.get("/access", async (req: Request, res: Response) => {
  try {
    const token = await userAuthController.access();
    const userId = userAuthController.decrypt(token);
    req.app.locals.id = userId;

    res.json({ token: token });
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
