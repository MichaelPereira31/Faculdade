import z from "zod";

export const loginUserSchema = z.object({
  password: z.string(),
  email: z.string(),
  remember: z.boolean(),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
