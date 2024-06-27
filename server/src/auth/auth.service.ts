import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "../users/IUser";
import { SignUpDto } from "./dto/SignUp.dto";
import { SignInDto } from "./dto/SignIn.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async generateToken(user: IUser) {
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(dto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.checkIfUserExists(dto.username);

        if (!user) throw new NotFoundException("User not exists.");

        if (bcrypt.compareSync(dto.password, user.password)) {
            return this.generateToken(user);
        }

        throw new UnauthorizedException("Wrong password");
    }

    async signUp(dto: SignUpDto) {
        const salt = bcrypt.genSaltSync(10);
        dto.password = bcrypt.hashSync(dto.password, salt);

        const user = await this.usersService.createUser(dto);

        return this.generateToken(user);
    }
}
