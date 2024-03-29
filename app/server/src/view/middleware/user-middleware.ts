import express from "express";
import UserAuthController from "../../lib/controller/user-auth-controller";

const router = express.Router();
const userAuthController = new UserAuthController();

router.use(userAuthController.validate);

export default router;
