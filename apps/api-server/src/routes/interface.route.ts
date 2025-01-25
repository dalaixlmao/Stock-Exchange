import { Router } from "express";
import { Route, Method } from "@repo/type/src";
import Logger from "@repo/logger/src";

abstract class RouterFactory {
  abstract __router: Router;
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
    Logger.getInstance().info(
      `New ${route.method.toString()} route API created, on ${route.path}`
    );
  }
}

export default RouterFactory;
