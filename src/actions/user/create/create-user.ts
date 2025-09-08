"use server";
import { UserType } from "@prisma/client";
import { z } from "zod";

import { UserRepository } from "@/db/Repositories/user-repository";

import { CreateUserSchema, createUserSchema } from "./schema";

export const createUser = async (data: CreateUserSchema) => {
  try {
    const validatedData = createUserSchema.parse(data);

    const userRepository = UserRepository.getInstance();

    const user = await userRepository.create({
      ...validatedData,
      type: UserType.USER,
    });

    return {
      success: true,
      data: user,
      message: "Usuário criado com sucesso",
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
