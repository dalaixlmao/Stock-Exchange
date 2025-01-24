import RouterFactory from "./interface.route";
import { Method, Route } from "../types";
import { Request, Response, Router } from "express";
import Logger from "@repo/logger/src";
import UserController from "../controllers/user.controller";

class UserRoute extends RouterFactory {
  private __routes: Route[];
  private __logger: Logger;
  private __user_controller: UserController;
  __router: Router;

  constructor() {
    super();
    this.__router = Router();
    this.__logger = Logger.getInstance();
    this.__user_controller = new UserController();

    this.__routes = [
      {
        path: "/signup",
        method: Method.POST,
        functions: [this.__user_controller.signup],
      },
      {
        path: "/login",
        method: Method.POST,
        functions: [this.__user_controller.login],
      },
    ];

    this.__routes.map((r) => {
      this.APIFactory(r);
      r.functions.map((f) => this.__router.use(r.path, f));
    });
  }

  getRouter(){
    return this.__router;
  }

  getRoutes() {
    return this.__routes;
  }

  APIFactory(route: Route): void {
    switch (route.method) {
      case Method.GET:
        this.__router.get(route.path);
      case Method.POST:
        this.__router.post(route.path);
      case Method.PUT:
        this.__router.put(route.path);
      case Method.DELETE:
        this.__router.delete(route.path);
      case Method.PATCH:
        this.__router.patch(route.path);
    }
    this.__logger.info(
      `New ${route.method.toString()} route API created, on ${route.path}`
    );
  }
}

export default UserRoute;
