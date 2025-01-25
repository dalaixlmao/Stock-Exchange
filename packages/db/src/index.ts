import Logger from "@repo/logger/src";
import User from "./models/user";
import Order from "./models/order";
import * as ZodType from "@repo/type/src";
import { number } from "prop-types";

class DB {
  private static __user: Map<number, User> = new Map<number, User>();
  private static __userEmailIndex: Map<string, number> = new Map<
    string,
    number
  >();
  private static __orderBook: Map<number, Order> = new Map<number, Order>();
  private static __indexOrderByUserId: Map<number, number[]> = new Map<
    number,
    number[]
  >();
  private static __db: DB | null = null;
  private __logger: Logger;

  private constructor() {
    this.__logger = Logger.getInstance();
  }

  static getInstance() {
    if (!this.__db) this.__db = new DB();
    return this.__db;
  }

  // ---------------------------------------------------------------------------

  createUser(name: string, email: string, password: string) {
    const id = new Date().getTime();
    const newUser = new User(id, name, email, password);
    DB.__user.set(id, newUser);
    DB.__userEmailIndex.set(email, id);
    this.__logger.info(
      `User created id${id}, name${name}, email${name}, balance${newUser.getBalance()}`
    );
    return id;
  }

  getUser(id: number) {
    return DB.__user.get(id) || null;
  }

  getUserByEmail(email: string) {
    const userId = DB.__userEmailIndex.get(email);
    if (userId) return DB.__user.get(userId) || null;
    return null;
  }

  validateUser(id: number) {
    return DB.__user.has(id);
  }

  createOrder(data: ZodType.OrderType) {
    const id = new Date().getTime();
    const newOrder = new Order(
      id,
      data.userId,
      data.type,
      data.orderType,
      data.quantity,
      data.price,
      data.market
    );
    DB.__orderBook.set(id, newOrder);
    const orders = DB.__indexOrderByUserId.get(data.userId);
    DB.__indexOrderByUserId.set(data.userId, orders ? [...orders, id] : [id]);
    this.__logger.info(
      `New order created:
       - id: ${id}
       - userId: ${data.userId}
       - type: ${data.type}
       - orderType: ${data.orderType}
       - quantity: ${data.quantity}
       - price: ${data.price}
       - market: ${data.market}`
    );
    return id;
  }

  getOrderById(id: number) {
    return DB.__orderBook.get(id) || null;
  }

  getAllOrdersByUserId(userId: number) {
    const orderIds = DB.__indexOrderByUserId.get(userId) || [];
    const orders = orderIds.map((o) => {
      return DB.__orderBook.get(o) || null;
    });
    return orders;
  }
}

export default DB;
