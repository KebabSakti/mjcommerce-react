import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { convertToValidPhoneNumber, generateOTP } from "../helper/common";
import { BadRequest, Failure, NotFound, Unauthorized } from "../helper/failure";
import { prisma } from "../helper/prisma";
import { Whatsapp } from "../helper/whatsapp";

export default class UserAuthController {
  async login(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        phone: Joi.string().required(),
        otp: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error || req.app.locals.otp != req.body.otp) {
        throw new BadRequest();
      }

      const validPhoneNumber = convertToValidPhoneNumber(req.body.phone);

      let user = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          phone: true,
          active: true,
        },
        where: {
          phone: validPhoneNumber,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            phone: validPhoneNumber,
          },
        });
      }

      if (!user.active) {
        throw new BadRequest();
      }

      const token = jwt.sign(user.id, process.env.HASH_SALT as string);

      const data: any = {
        data: {
          token: token,
          user: user,
        },
      };

      res.json(data);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        phone: Joi.string().required(),
        otp: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const userExist = await prisma.user.findFirst({
        where: {
          phone: req.body.phone,
        },
      });

      if (userExist || req.app.locals.otp != req.body.otp) {
        throw new BadRequest();
      }

      delete req.app.locals.opt;

      const registeredUser = await prisma.user.create({
        data: {
          name: req.body.name,
          phone: req.body.phone,
        },
      });

      const token = jwt.sign(
        registeredUser.id,
        process.env.HASH_SALT as string
      );

      const data: any = {
        data: {
          token: token,
          user: registeredUser,
        },
      };

      res.json(data);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = Joi.object({
        authorization: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.headers);

      if (error) {
        throw new Unauthorized();
      }

      const authorization = req.headers.authorization;
      const payloads = authorization!.split(" ");

      if (payloads.length == 2) {
        const token = payloads[1];

        const userId = jwt.verify(
          token,
          process.env.HASH_SALT as string
        ) as string;

        const user = await prisma.user.findFirst({
          where: {
            active: true,
            id: userId,
          },
        });

        if (user == null) {
          throw new NotFound();
        }

        req.app.locals.userId = user?.id;
        req.app.locals.user = user;

        return next();
      }

      throw new Unauthorized();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async otp(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        phone: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const phoneNumber = convertToValidPhoneNumber(req.body.phone);
      const otp = generateOTP();
      req.app.locals.otp = otp;

      await Whatsapp.send(
        phoneNumber,
        `JANGAN BERIKAN KODE INI KE SIAPAPUN\n\nKode OTP anda : ${otp}`
      );

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
