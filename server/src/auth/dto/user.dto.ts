import { Prisma } from "@prisma/client";

export class UserDro implements Prisma.UserUncheckedCreateInput {
    id?: number;
    username: string;
    email: string;
    fullname?: string;
    password: string;
    ban?: boolean;
    visitedAt?: string | Date;
    createdAt?: string | Date;
    refreshToken: string;
    files?: Prisma.FileUncheckedCreateNestedManyWithoutUserInput;
}
