import { Request, Response } from "express";
import OrderService from "../services/order.service";
import axios from "axios";
const queueURL = "http://localhost:3010";
class OrderController {
  private __orderService: OrderService;
  constructor() {
    this.createOrders = this.createOrders.bind(this);
    this.__orderService = new OrderService();
  }

  async createOrders(req: Request, res: Response) {
    const { type, price, quantity, market, orderType } = req.body;
    try {
      const id = this.__orderService.getNewOrderId();
      const userId = req.user_id;
      const response = await axios.post(`${queueURL}/queue/order/add`, {
        id,
        type,
        price,
        quantity,
        market,
        orderType,
        userId,
      });
      if (response.status == 200)
        res
          .status(200)
          .json({ messgae: "Order created successfully!", id: id });
      else {
        res.status(500).json({ message: "Can't add order!" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default OrderController;
