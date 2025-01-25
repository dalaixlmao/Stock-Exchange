import { NextFunction, Request, Response } from "express";

interface Route {
  path: string;
  method: Method;
  functions: RestFunction[];
}

type RestFunction =
  | ((req: Request, res: Response, next: NextFunction) => void)
  | ((req: Request, res: Response, next: NextFunction) => Promise<void>)
  | ((req: Request, res: Response) => void)
  | ((req: Request, res: Response) => Promise<void>);

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

declare global {
  namespace Express {
    interface Request {
      user_id?: number | string;
    }
  }
}

export { Route, Method, RestFunction };
