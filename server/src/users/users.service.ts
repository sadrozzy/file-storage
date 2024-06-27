import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { IUser } from "./IUser";
import { SignUpDto } from "../auth/dto/SignUp.dto";

@Injectable()
export class UsersService {
    constructor(private db: DatabaseService) {}

    async checkIfUserExists(username: string): Promise<IUser> {
        const user = await this.db.user.findUnique({
            where: {
                username: username,
            },
        });

        return user;
    }

    async createUser(dto: SignUpDto) {
        if (await this.checkIfUserExists(dto.username))
            throw new ConflictException("User already exists.");

        return this.db.user.create({
            data: {
                ...dto,
            },
        });
    }
}
