import { Prisma } from "@prisma/client";

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
    username: string;
    firstname: string;
    email: string;
    password: string;
    refreshToken: string;
}
