import express from "express";
import { Router } from "express";

import Logger from "@repo/logger/src";
import cors from "cors";

export class ExpressApp {
  private __app: express.Application;
  private __logger: Logger;
  private __routes = [{ route: "users" }];

  constructor() {
    this.__app = express();
    this.__logger = Logger.getInstance();
    this.__app.use(cors());
    this.__app.route("/api/v1/users");
  }

  public listen(port: number): void {
    this.__app.listen(port, () => {
      this.__logger.info(`Server is running on port ${port}`);
    });
  }
}

export default ExpressApp;
