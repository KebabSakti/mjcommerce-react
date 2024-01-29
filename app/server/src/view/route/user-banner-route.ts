import express, { Request, Response } from "express";
import UserBannerController from "../../lib/controller/user-banner-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const bannerController = new UserBannerController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const banners = await bannerController.getBanner();

    res.json(banners);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
