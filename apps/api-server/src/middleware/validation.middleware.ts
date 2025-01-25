import { NextFunction, Request, Response } from "express";
import * as ZodType from "@repo/type/src";
class ValidationMiddleware {
  private __validator: ZodType.default;

  constructor() {
    this.__validator = new ZodType.default();
    this.validateSignupRequest = this.validateSignupRequest.bind(this);
    this.validateLoginRequest = this.validateLoginRequest.bind(this);
  }

  validateSignupRequest(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const check = this.__validator.validate(
      ZodType.default.userSignupSchema,
      body
    );
    if (check) {
      next();
    } else {
      res.status(401).json({ message: "Wrong input format!" });
    }
  }

  validateLoginRequest(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const check = this.__validator.validate(
      ZodType.default.userLoginSchema,
      body
    );
    if (check) {
      next();
    } else {
      res.status(401).json({ message: "Wrong input format!" });
    }
  }

  validateOrderRequest(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const check = this.__validator.validate(
      ZodType.default.orderInputSchema,
      body
    );
    if (check) next();
    else {
      res.status(422).json({ message: "Wrong input" });
    }
  }
}

export default ValidationMiddleware;
