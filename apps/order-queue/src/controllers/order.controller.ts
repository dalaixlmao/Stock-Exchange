import { Request, Response } from "express";
import Logger from "@repo/logger/src";
import OrderQueueService from "../services/order-queue.service";

class OrderController {
  constructor() {}

  addOrder(req: Request, res: Response) {
    const { id, userId, type, price, orderType, market, quantity } = req.body;
    try {
      OrderQueueService.addElement(
        { id, userId, type, price, orderType, market, quantity },
        3
      );
      Logger.getInstance().info(`Added order ID ${id} to queue!`);
      res.status(200).json({ message: "Added order id to queue id " + id });
    } catch (error: any) {
      Logger.getInstance().error(error.message);
      res.status(500).json({ message: "Failed to add to queue", error: error });
    }
  }
}

export default OrderController;