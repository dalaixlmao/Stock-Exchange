import RouterFactory from "./interface.route";
import { Method, Route } from "@repo/type/src";
import { Router } from "express";
import Logger from "@repo/logger/src";
import ValidationMiddleware from "../middleware/validation.middleware";
import AuthenticationMiddleware from "../middleware/authentication.middleware";
import OrderController from "../controllers/order.controller";

class OrderRoute extends RouterFactory {
  private __routes: Route[];
  private __logger: Logger;
  private __validation_middleware: ValidationMiddleware;
  private __order_controller: OrderController;
  private __authentication_middleware: AuthenticationMiddleware;
  __router: Router;

  constructor() {
    super();
    this.__router = Router();
    this.__logger = Logger.getInstance();
    this.__validation_middleware = new ValidationMiddleware();
    this.__order_controller = new OrderController();
    this.__authentication_middleware = new AuthenticationMiddleware();

    this.__routes = [
      {
        path: "/create",
        method: Method.POST,
        functions: [
          this.__validation_middleware.validateOrderRequest,
          this.__authentication_middleware.userAuth,
          this.__order_controller.createOrders,
        ],
      },
    ];

    this.__routes.map((r) => {
      this.APIFactory(r);
      r.functions.map((f) => this.__router.use(r.path, f));
    });
  }
}

export default OrderRoute;
