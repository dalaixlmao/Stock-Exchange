import RouterFactory from "./interface.route";
import { Method, Route } from "../types";
import { Router } from "express";
import Logger from "@repo/logger/src";
import UserController from "../controllers/user.controller";
import ValidationMiddleware from "../middleware/validation.middleware";

class UserRoute extends RouterFactory {
  private __routes: Route[];
  private __logger: Logger;
  private __user_controller: UserController;
  private __validation_middleware: ValidationMiddleware;
  __router: Router;

  constructor() {
    super();
    this.__router = Router();
    this.__logger = Logger.getInstance();
    this.__user_controller = new UserController();
    this.__validation_middleware = new ValidationMiddleware();

    this.__routes = [
      {
        path: "/signup",
        method: Method.POST,
        functions: [
          this.__validation_middleware.validateSignupRequest,
          this.__user_controller.signup,
        ],
      },
      {
        path: "/login",
        method: Method.POST,
        functions: [
          this.__validation_middleware.validateLoginRequest,
          this.__user_controller.login,
        ],
      },
    ];

    this.__routes.map((r) => {
      this.APIFactory(r);
      r.functions.map((f) => this.__router.use(r.path, f));
    });
  }

  getRouter() {
    return this.__router;
  }

  getRoutes() {
    return this.__routes;
  }
}

export default UserRoute;
