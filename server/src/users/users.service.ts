import { ConflictException, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { SignUpDto } from "../auth/dto/SignUp.dto";

@Injectable()
export class UsersService {
    constructor(private db: DatabaseService) {}

    async findById(id: number) {
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
            },
        });
    }

    async checkIfUserExists(username: string) {
        return this.db.user.findUnique({
            where: {
                username: username,
            },
        });
    }

    async createUser(signUpDto: SignUpDto) {
        if (await this.checkIfUserExists(signUpDto.username))
            throw new ConflictException("User already exists.");

        return this.db.user.create({
            data: {
                ...signUpDto,
            },
        });
    }
}
