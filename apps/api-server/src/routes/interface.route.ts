import { NextFunction, Router } from "express";
import { Route, RestFunction, Method } from "../types";

class RouteInterface {
  private __router: Router;

  constructor(routes: Route[]) {
    this.__router = Router();
    routes.map((r) => {
      this.APIFactory(r);
      r.functions.map((f) => this.__router.use(r.path, f));
    });
  }

  APIFactory(route: Route) {
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
  }
}

export default RouteInterface;
