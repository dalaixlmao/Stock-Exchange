import { createClient, RedisClientType } from "redis";
import Logger from "@repo/logger/src";
import { OrderType } from "@repo/type/src";

class OrderQueueService {
  private static __client: RedisClientType = createClient();
  private __logger: Logger; 
  private static __maxRetries = 3; 

  constructor() {
    this.__logger = Logger.getInstance();
    OrderQueueService.__client.on("error", (e) => {
      this.__logger.error(`Redis Error: ${e.message}`);
    });
  }

  async initialize(): Promise<void> {
    try {
      this.__logger.info("Connecting to Redis client...");
      await OrderQueueService.__client.connect();
      this.__logger.info("Redis client connected!");
    } catch (e: any) {
      this.__logger.error(`Redis connection failed: ${e.message}`);
      throw new Error("Redis initialization failed");
    }
  }

  static async addElement(order: OrderType, retryCount = 0): Promise<void> {
    try {
      await this.__client.lPush("order", JSON.stringify(order));
    } catch (e: any) {
      if (retryCount < OrderQueueService.__maxRetries) {
        Logger.getInstance().error(
          `Retrying to push to Redis (${retryCount + 1}/${OrderQueueService.__maxRetries})...`
        );
        await this.__delay(1000);
        await OrderQueueService.addElement(order, retryCount + 1);
      } else {
        Logger.getInstance().error("Pushing to Redis failed after maximum retries!");
        throw new Error("Failed to push to Redis");
      }
    }
  }

  private static __delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default OrderQueueService;
