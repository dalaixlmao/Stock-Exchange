import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config/env";
import UserService from "../services/user.service";

class AuthenticationMiddleware {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  userAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "No token found!" });
      return;
    }
    const decode = verify(token, config.jwt_password) as JwtPayload;
    const id = parseInt(decode.id);
    const checkUser = this.userService.validateUser(id);
    if (checkUser) {
      req.user_id = id;
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  }
}


export default AuthenticationMiddleware;