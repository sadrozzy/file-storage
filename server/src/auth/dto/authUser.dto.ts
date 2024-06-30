import { Prisma } from "@prisma/client";

export class AuthUserDto {
    username: string;
    email: string;
    password: string;
}
