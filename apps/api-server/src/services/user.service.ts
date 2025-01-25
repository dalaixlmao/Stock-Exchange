import * as ZodTypes from "@repo/type/src";
import DB from "@repo/db/src";
import { compare, hash } from "bcrypt";
import Logger from "@repo/logger/src";

class UserService {
  private __db: DB;
  private __logger: Logger;
  constructor() {
    this.__db = DB.getInstance();
    this.__logger = Logger.getInstance();
  }

  async signup(data: ZodTypes.userSignupType) {
    if (this.__db.getUserByEmail(data.email)) {
      this.__logger.error(`User already exists with email ${data.email}`);
      return;
    }
    const hashedPass = await hash(data.password, 10);
    const id = this.__db.createUser(data.name, data.email, hashedPass);
    return id;
  }

  async login(data: ZodTypes.userLoginType) {
    const user = this.__db.getUserByEmail(data.email);

    if (!user) {
      this.__logger.error(`User does not exists with email ${data.email}`);
      return;
    }

    const check = await compare(data.password, data.password);
    if (!check) {
      this.__logger.error("Wrong Password!");
    }
    return user;
  }

  validateUser(id: number) {
    return this.__db.validateUser(id);
  }
}

export default UserService;
