import { ConflictException, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { CreateUserDto } from "../auth/dto/createUser.dto";

@Injectable()
export class UsersService {
    constructor(private db: DatabaseService) {}

    async createUser(createUserDto: CreateUserDto) {
        if (await this.findUserByUsername(createUserDto.username))
            throw new ConflictException("User already exists.");

        return this.db.user.create({
            data: {
                ...createUserDto,
            },
        });
    }

    async deleteUser(id: number) {
        return this.db.user.delete({
            where: {
                id: id,
            },
        });
    }

    async updateUser(username: string, updateUserDto: UpdateUserDto) {
        return this.db.user.update({
            where: { username: username },
            data: updateUserDto,
        });
    }

    async findAll() {
        return this.db.user.findMany();
    }

    async findUserById(id: number) {
        return this.db.user.findUnique({
            where: {
                id: +id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                fullname: true,
                password: false,
                ban: true,
                visitedAt: true,
                createdAt: true,
                refreshToken: true,
            },
        });
    }

    async findUserByUsername(username: string) {
        return this.db.user.findUnique({
            where: {
                username: username,
            },
        });
    }
}
