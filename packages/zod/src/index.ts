import zod from "zod";

const userSignupSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

const userLoginSchema = userSignupSchema.omit({ name: true });

const orderSchema = zod.object({
    
})
