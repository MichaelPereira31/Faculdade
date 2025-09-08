import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
