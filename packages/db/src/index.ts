import Redis from "ioredis";
import Logger from "@repo/logger/src";
import * as ZodTypes from "@repo/type/src";

class DB {
  protected __db: Redis;
  protected __logger: Logger;

  constructor() {
    this.__db = new Redis();
    this.__logger = Logger.getInstance();
  }
  async get(key: string) {
    return await this.__db.get(key);
  }
  async validate(key: string) {
    const check = await this.__db.get(key);
    if (check) return true;
    return false;
  }

  async set(key: string, value: any) {
    return await this.__db.set(key, value);
  }
}

class UserDB extends DB {
    private static instance: UserDB | null = null;
  
    private constructor() {
      super();
    }
  
    static getInstance() {
      if (!this.instance) this.instance = new UserDB();
      return this.instance;
    }
  
    async createUser(name: string, email: string, password: string) {
      const id = new Date().getTime();
  
      await this.__db.hset(`user:${id}`, {
        id,
        name,
        email,
        password,
        balance: 1000000,
        createdAt: new Date().toISOString(),
      });
      await this.__db.set(`index:user:email:${email}`, id.toString());
      return id;
    }
  
    async getUser(id: number): Promise<ZodTypes.userType | null> {
      const user = await this.__db.hgetall(`user:${id}`);
      if (Object.keys(user).length === 0) return null;
  
      return {
        id: parseInt(user.id),
        name: user.name,
        email: user.email,
        password: user.password,
        balance: parseFloat(user.balance),
        createdAt: new Date(user.createdAt),
      } as ZodTypes.userType;
    }
  
    async validateUser(id: number): Promise<boolean> {
      const exists = await this.__db.exists(`user:${id}`);
      return exists > 0;
    }
  
    async getUserByEmail(email: string): Promise<ZodTypes.userType | null> {
      const id = await this.__db.get(`index:user:email:${email}`);
      if (!id) throw new Error(`User with email ${email} not found`);
  
      const user = await this.__db.hgetall(`user:${id}`);
      if (Object.keys(user).length === 0) throw new Error(`User with ID ${id} not found`);
  
      return {
        id: parseInt(user.id),
        name: user.name,
        email: user.email,
        password: user.password,
        balance: parseFloat(user.balance),
        createdAt: new Date(user.createdAt),
      } as ZodTypes.userType;
    }
  }
  

export default UserDB;
