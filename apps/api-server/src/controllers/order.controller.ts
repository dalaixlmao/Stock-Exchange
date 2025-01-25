import { Request, Response } from "express";

class OrderController {
  constructor() {
    this.createOrders = this.createOrders.bind(this);
  }

  createOrders(req: Request, res: Response) {
    const { type, price, quantity, market, orderType } = req.body;
  }
}
