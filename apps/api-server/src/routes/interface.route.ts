import { NextFunction, Router } from "express";
import { Route, RestFunction, Method } from "../types";
import Logger from "@repo/logger/src";

abstract class RouterFactory {
  abstract __router: Router;
  abstract APIFactory(route: Route): void;
}

export default RouterFactory;
