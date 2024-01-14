import express, { Request, Response } from "express";
import BannerController from "../../lib/controller/banner-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const bannerController = new BannerController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const banners = await bannerController.getBanners();

    console.log(req.query);

    res.json(banners);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
