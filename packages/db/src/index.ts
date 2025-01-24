import Redis from "ioredis";

class DB {
  private __db: Redis;

  private static __instance: DB | null = null;

  private constructor() {
    this.__db = new Redis();
  }

  static getInstance() {
    if (!this.__instance) this.__instance = new DB();
    return this.__instance;
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
