import { UserType } from "@prisma/client";

export type CreateUserDTO = {
  email: string;
  password: string;
  name: string;
  type: UserType;
};
