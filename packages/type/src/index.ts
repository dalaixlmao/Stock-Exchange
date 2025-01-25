import zod from "zod";

class ZodSchema {
  static userSignupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  static userLoginSchema = this.userSignupSchema.omit({ name: true });

  static orderInputSchema = zod.object({
    price: zod.number(),
    userId: zod.number(),
    quantity: zod.number(),
    type: zod.union([zod.literal("BUY"), zod.literal("SELL")]),
    orderType: zod.union([zod.literal("LIMIT"), zod.literal("MARKET")]),
    market: zod.string()
  });

  validate<Type>(schema: zod.ZodType<Type>, object: Type) {
    const result = schema.safeParse(object);
    return result.success;
  }
}

type userSignupType = zod.infer<typeof ZodSchema.userSignupSchema>;
type userLoginType = zod.infer<typeof ZodSchema.userLoginSchema>;
type orderInputType = zod.infer<typeof ZodSchema.orderInputSchema>;
interface userType {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  balance: number;
}

interface OrderType {
  id: number;
  price: number;
  userId: number;
  quantity: number;
  type: "BUY" | "SELL";
  orderType: "LIMIT" | "MARKET";
  market: string;
}

export default ZodSchema;
export type { userLoginType, userSignupType, orderInputType, userType, OrderType };
