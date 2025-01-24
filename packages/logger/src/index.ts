import winston from "winston";

class Logger {
  private __logger: winston.Logger;

  private static instance: Logger | null = null;

  private constructor() {
    this.__logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });
  }

  public log(type: string, message: string): void {
    console.log(
      "\n-----------------------------------------------------------------"
    );
    console.log(
      `[${type}]`,
      "[",
      new Date(new Date().getTime() + 330 * 1000 * 60).toISOString(),
      "]",
      " ",
      message
    );
    console.log(
      "-----------------------------------------------------------------\n"
    );
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public info(message: string): void {
    this.log("INF", message);
    this.__logger.info(message);
  }

  public error(message: string): void {
    this.log("ERR", message);

    this.__logger.error(message);
  }

  public warn(message: string): void {
    this.log("WAR", message);

    this.__logger.error(message);
  }
}

export default Logger;
