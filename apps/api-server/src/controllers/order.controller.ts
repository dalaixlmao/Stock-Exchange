import { Request, Response } from "express";
import OrderService from "../services/order.service";
class OrderController {
  private __orderService: OrderService;
  constructor() {
    this.createOrders = this.createOrders.bind(this);
    this.__orderService = new OrderService();
  }

  createOrders(req: Request, res: Response) {
    const { type, price, quantity, market, orderType } = req.body;
    try {
      const id = this.__orderService.getNewOrderId();
      // add to queue logic
      res.status(200).json({ messgae: "Order created successfully!", id: id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
