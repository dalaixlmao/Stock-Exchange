import express, { Router } from "express";
import cors from "cors";
import OrderController from "./controllers/order.controller";
import Logger from "@repo/logger/src";

class App {
  private __app: express.Application;
  private __order_controller: OrderController;
  private __port: number;
  private __logger: Logger;

  constructor() {
    this.__app = express();
    this.__logger = Logger.getInstance();
    this.__app.use(cors());
    this.__app.use(express.json());
    this.__order_controller = new OrderController();
    this.__app.post("/queue/order/add", this.__order_controller.addOrder);
    this.__port = 3010;
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

export default App;
