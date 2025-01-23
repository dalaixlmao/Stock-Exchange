import { Application, NextFunction, Request, Response } from "express";

interface Route {
  path: string;
  method: Method;
  functions: RestFunction[];
}

type RestFunction =
  | ((req: Request, res: Response, next?: NextFunction) => void)
  | ((req: Request, res: Response, next?: NextFunction) => Promise<void>);

enum Method {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export { Route, Method, RestFunction };
