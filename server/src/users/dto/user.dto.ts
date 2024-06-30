import { Prisma } from "@prisma/client";

export class UserDto {
    id?: number;
    username: string;
    email: string;
    fullname?: string;
    ban?: boolean;
    visitedAt?: string | Date;
    createdAt?: string | Date;
    refreshToken: string;
    files?: Prisma.FileUncheckedCreateNestedManyWithoutUserInput;
}
