import Logger from "@repo/logger/src";
import User from "./models/user";

class DB {
  private static __user: Map<number, User> = new Map<number, User>();
  private static __userEmailIndex: Map<string, number> = new Map<
    string,
    number
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
}

export default DB;
