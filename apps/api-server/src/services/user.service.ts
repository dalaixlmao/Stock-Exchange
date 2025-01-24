import * as ZodTypes from "@repo/type/src";
import UserDB from "@repo/db/src";
import { compare, hash } from "bcrypt";
import Logger from "@repo/logger/src";

class UserService {
  private __db: UserDB;
  private __logger: Logger;
  constructor() {
    this.__db = UserDB.getInstance();
    this.__logger = Logger.getInstance();
  }

  async signup(data: ZodTypes.userSignupType) {
    if (await this.__db.getUserByEmail(data.email)) {
      this.__logger.error(`User already exists with email ${data.email}`);
      return;
    }

    const hashedPass = await hash(data.password, 10);
    const id = await this.__db.createUser(data.name, data.email, hashedPass);
    this.__logger.info(`New user created with id ${id}`);
    return id;
  }

  async login(data: ZodTypes.userLoginType) {
    const user = await this.__db.getUserByEmail(data.email);

    if (!user) {
      this.__logger.error(`User does not exists with email ${data.email}`);
      return;
    }

    const check = await compare(data.password, user.password);
    if(!check){
        this.__logger.error("Wrong Password!");
    }
    return user.id;
  }
}

export default UserService;