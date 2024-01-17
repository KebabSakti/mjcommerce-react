import express, { Request, Response } from "express";
import UserAuthController from "../../lib/controller/user-auth-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const userAuthController = new UserAuthController();

router.post("/access", async (req: Request, res: Response) => {
  try {
    const token = await userAuthController.access(req.body.token);
    const userId = userAuthController.decrypt(token);
    req.app.locals.id = userId;

    res.json({ token: token });
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
