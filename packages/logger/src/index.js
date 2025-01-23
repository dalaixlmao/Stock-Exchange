"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor() {
        this.__logger = winston_1.default.createLogger({
            level: "info",
            format: winston_1.default.format.json(),
            defaultMeta: { service: "user-service" },
            transports: [
                new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
                new winston_1.default.transports.File({ filename: "combined.log" }),
            ],
        });
    }
    log(type, message) {
        console.log("\n-----------------------------------------------------------------");
        console.log(`[${type}]`, "[", new Date(new Date().getTime() + 330 * 1000 * 60).toISOString(), "]", " ", message);
        console.log("-----------------------------------------------------------------\n");
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    info(message) {
        this.log("INF", message);
        this.__logger.info(message);
    }
    error(message) {
        this.log("ERR", message);
        this.__logger.error(message);
    }
    warn(message) {
        this.log("WAR", message);
        this.__logger.error(message);
    }
}
Logger.instance = null;
module.exports = Logger;
