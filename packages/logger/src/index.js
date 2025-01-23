"use strict";
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(type, message) {
        console.log("\n-----------------------------------------------------------------");
        console.log(type, "[", new Date(new Date().getTime() + 330 * 1000 * 60).toISOString(), "]", " ", message);
        console.log("-----------------------------------------------------------------\n");
    }
    info(message) {
        this.log("[INF]", message);
    }
    error(message) {
        this.log("[ERR]", message);
    }
    warn(message) {
        this.log("[WAR]", message);
    }
}
Logger.instance = null;
module.exports = Logger;
