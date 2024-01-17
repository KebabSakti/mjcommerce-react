import express, { Request, Response } from "express";
import { ControllerData } from "../../lib/config/type";
import BannerController from "../../lib/controller/banner-controller";
import { Failure } from "../../lib/helper/failure";

const router = express.Router();
const bannerController = new BannerController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query.parsedQuery as ControllerData;
    const banners = await bannerController.getBanners(query);

    res.json(banners);
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
