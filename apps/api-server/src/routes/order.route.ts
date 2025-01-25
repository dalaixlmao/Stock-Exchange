import RouterFactory from "./interface.route";
import { Method, Route } from "../types";
import { Router } from "express";
import Logger from "@repo/logger/src";
import ValidationMiddleware from "../middleware/validation.middleware";

class OrderRoute extends RouterFactory {
  private __routes: Route[];
  private __logger: Logger;
  private __validation_middleware: ValidationMiddleware;
  __router: Router;

  constructor() {
    super();
    this.__router = Router();
    this.__logger = Logger.getInstance();
    this.__validation_middleware = new ValidationMiddleware();

    this.__routes = [
      {
        path: "/create",
        method: Method.POST,
        functions: [],
      },
      {
        path: "/get",
        method: Method.GET,
        functions: [],
      },
    ];

    this.__routes.map((r) => {
      this.APIFactory(r);
      r.functions.map((f) => this.__router.use(r.path, f));
    });
  }
}

export default OrderRoute;
