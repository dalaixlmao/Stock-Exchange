import Redis, { RedisKey } from "ioredis";
import { RedisClient } from "ioredis/built/connectors/SentinelConnector/types";

class DB {
  private __db: Redis;

  constructor() {
    this.__db = new Redis();
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


export default DB;