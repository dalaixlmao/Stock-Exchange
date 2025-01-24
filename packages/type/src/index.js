"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class ZodSchema {
    constructor() {
        this.userSignupSchema = zod_1.default.object({
            name: zod_1.default.string(),
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(8),
        });
        this.userLoginSchema = this.userSignupSchema.omit({ name: true });
        this.orderSchema = zod_1.default.object({});
    }
    validate(schema, object) {
        const result = schema.safeParse(object);
        return result.success;
    }
}
const temp = new ZodSchema();
exports.default = ZodSchema;
