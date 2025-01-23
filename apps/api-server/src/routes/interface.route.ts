import { NextFunction, Router } from "express";
import { Route, RestFunction, Method } from "../types";

class RouteInterface {
  private __router: Router;

  constructor(routes: Route[]) {
    this.__router = Router();
  }

  APIFactory(route: Route) {
    switch (route.method) {
      case Method.GET:
        this.__router.get(route.path);
    }
  }

  f(){
  }

}

export default RouteInterface;
