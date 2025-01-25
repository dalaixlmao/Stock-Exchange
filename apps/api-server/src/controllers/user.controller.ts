import { Request, Response, Router } from "express";
import Logger from "@repo/logger/src";
import UserService from "../services/user.service";
import jwt from "jsonwebtoken";
import config from "../config/env";

class UserController {
  private __logger: Logger;
  private __userService: UserService;

  constructor() {
    this.__logger = Logger.getInstance();
    this.__userService = new UserService();

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const id = await this.__userService.signup({ name, email, password });
      const token = jwt.sign({ id }, config.jwt_password);
      this.__logger.info("New user created with id " + id);
      res
        .status(200)
        .json({ message: "New user created!", token: "Bearer " + token });
    } catch (error: any) {
      this.__logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const id = await this.__userService.login({ email, password });
      const token = jwt.sign({ id }, config.jwt_password);
      this.__logger.info("User logged in successfully with id " + id);
      res.status(200).json({ message: "User loggedin successfully!", token: "Bearer " + token });
    } catch (error: any) {
      this.__logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
