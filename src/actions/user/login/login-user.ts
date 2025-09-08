"use server";
import { string, z } from "zod";

import { LoginUserDTO } from "@/db/dtos/user/login-user-dto";
import { UserRepository } from "@/db/Repositories/user-repository";
import { JwtService } from "@/lib/auth/jwt";

import { loginUserSchema } from "./schema";
import { id } from "zod/v4/locales";

export const loginUser = async (data: LoginUserDTO) => {
  try {
    const validatedData = loginUserSchema.parse(data);

    const userRepository = UserRepository.getInstance();

    const user = await userRepository.login({
      email: validatedData.email,
      password: validatedData.password,
    });

    const payload = {
      userId: user.id,
      type: user.type,
      email: user.email,
    };

    const jsonWebToken = JwtService.getInstance().generateTokenPair(payload);

    return {
      success: true,
      message: "Usuário autenticado com sucesso",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
          token: jsonWebToken.accessToken,
        },
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Dados inválidos",
        details: error.message,
      };
    }

    if (error instanceof Error && error.message === "Email já está em uso") {
      return {
        success: false,
        error: "Email já está em uso",
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
};
