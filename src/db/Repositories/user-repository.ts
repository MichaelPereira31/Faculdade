import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "..";

import { CreateUserDTO } from "../dtos/user/create-user-dto";
import { LoginUserDTO } from "../dtos/user/login-user-dto";
export class UserRepository {
  private static instance: UserRepository;
  private saltRounds = 12;

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, this.saltRounds),
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Email já cadastrado");
        }
      }
      throw new Error("Erro ao criar usuário");
    }
  }

  async login({ email, password }: LoginUserDTO): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
