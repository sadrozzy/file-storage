import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { CreateUserDto } from "../auth/dto/createUser.dto";
import { FilesService } from "../files/files.service";
import { join } from "path";
import { unlink } from "fs";
import { promisify } from "util";

@Injectable()
export class UsersService {
    constructor(
        private db: DatabaseService,
        private filesService: FilesService,
    ) {}

    private readonly unlinkAsync = promisify(unlink);

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
        const user = await this.db.user.findUnique({
            where: {
                id: +id,
            },
        });

        if (!user) throw new NotFoundException("User does not exists.");

        const files = await this.filesService.findAll(id);
        for (const file of files) {
            const filePath = join(
                __dirname,
                "..",
                "..",
                "uploads",
                file.filename,
            );
            await this.unlinkAsync(filePath).catch((err) => {
                console.error("Error deleting file:", err);
            });
        }
        return this.db.user.delete({
            where: {
                id: +id,
            },
        });
    }

    async updateUser(username: string, updateUserDto: UpdateUserDto) {
        const user = await this.db.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) throw new NotFoundException("User does not exists.");

        return this.db.user.update({
            where: { username: username },
            data: updateUserDto,
        });
    }

    async findAll() {
        return this.db.user.findMany();
    }

    async findUserById(id: number) {
        const user = await this.db.user.findUnique({
            where: {
                id: +id,
            },
        });

        if (!user) throw new NotFoundException("User does not exists.");

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
