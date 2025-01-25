"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
const zod_1 = __importDefault(require("zod"));
class ZodSchema {
    validate(schema, object) {
        const result = schema.safeParse(object);
        return result.success;
    }
}
_a = ZodSchema;
ZodSchema.userSignupSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
ZodSchema.userLoginSchema = _a.userSignupSchema.omit({ name: true });
ZodSchema.orderInputSchema = zod_1.default.object({
    price: zod_1.default.number(),
    quantity: zod_1.default.number(),
    type: zod_1.default.union([zod_1.default.literal("BUY"), zod_1.default.literal("SELL")]),
    orderType: zod_1.default.union([zod_1.default.literal("LIMIT"), zod_1.default.literal("MARKET")]),
    market: zod_1.default.string(),
});
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["PATCH"] = "PATCH";
    Method["DELETE"] = "DELETE";
})(Method || (exports.Method = Method = {}));
exports.default = ZodSchema;
