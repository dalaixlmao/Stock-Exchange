import zod from "zod";

class ZodSchema {
  userSignupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  userLoginSchema = this.userSignupSchema.omit({ name: true });

  orderSchema = zod.object({});

  validate<Type>(schema: zod.ZodType<Type>, object: Type) {
    const result = schema.safeParse(object);
    return result.success;
  }
}

const temp: ZodSchema = new ZodSchema();
type userSignupType = zod.infer<typeof temp.userSignupSchema>;
type userLoginType = zod.infer<typeof temp.userLoginSchema>;
type orderType = zod.infer<typeof temp.orderSchema>;
interface userType {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  balance: number;
}

export default ZodSchema;
export type { userLoginType, userSignupType, orderType, userType };
