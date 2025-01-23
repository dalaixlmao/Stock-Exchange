class Logger {
  private static instance: Logger | null = null;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(type: string, message: string): void {
    console.log(
      "\n-----------------------------------------------------------------"
    );
    console.log(
      type,
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

  public info(message: string): void {
    this.log("[INF]", message);
  }

  public error(message: string): void {
    this.log("[ERR]", message);
  }

  public warn(message: string): void {
    this.log("[WAR]", message);
  }
}

export = Logger;
