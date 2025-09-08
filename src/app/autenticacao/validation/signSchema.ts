import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "Email é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
  remember: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
