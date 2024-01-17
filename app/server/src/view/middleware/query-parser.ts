import { NextFunction, Request, Response } from "express";
import { ControllerData } from "../../lib/config/type";
import { Failure } from "../../lib/helper/failure";

export default async function queryParser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const param: ControllerData = {
      paginate:
        req.query.skip == undefined || req.query.take == undefined
          ? undefined
          : ({
              skip: parseInt(req.query.skip as any),
              take: parseInt(req.query.take as any),
            } as any),
      sorting: {
        field: req.query.field,
        direction: req.query.direction,
      } as any,
    };

    req.query.parsedQuery = param as any;
    
    next();
  } catch (error: any) {
    Failure.handle(error, res);
  }
}
