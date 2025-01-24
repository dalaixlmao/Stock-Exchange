import express from "express";

import Logger from "@repo/logger/src";
import cors from "cors";
import UserRoute from "../routes/user.route";
import RouterFactory from "../routes/interface.route";

export class ExpressApp {
  private __app: express.Application;
  private __logger: Logger;
  private __user_router: RouterFactory;
  private __port: number;

  constructor() {
    this.__port = 3002;
    this.__app = express();
    this.__user_router = new UserRoute;
    this.__logger = Logger.getInstance();
    this.__app.use(cors());
    this.__app.use("/api/v1/user", this.__user_router.__router);
    this.__app.use(express.json());
  }

  public listen(): void {
    const server = this.__app.listen(this.__port, () => {
      this.__logger.info(`Started server on port ${this.__port}`);
    });

    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        this.__logger.warn(`Port ${this.__port} is busy!`);
        this.__port++;
        this.listen();
      } else {
        this.__logger.error(err.message);
      }
    });
  }
}

export default ExpressApp;
