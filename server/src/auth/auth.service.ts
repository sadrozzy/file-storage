import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { AuthUserDto } from "./dto/authUser.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserDto } from "../users/dto/user.dto";
import * as argon2 from "argon2";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    private readonly logger = new Logger("FilesService");

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findUserByUsername(username);

        if (user && bcrypt.compareSync(password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(authUserDto: AuthUserDto, res: Response) {
        const _user: UserDto = await this.usersService.findUserByUsername(
            authUserDto.username,
        );

        const { password, refreshToken, ...user } = _user;

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.json({ ...user, tokens });
    }

    async signup(createUserDto: CreateUserDto) {
        const salt = bcrypt.genSaltSync(10);
        createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);

        const user: UserDto = await this.usersService.createUser(createUserDto);
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
        return {
            tokens,
        };
    }

    async logout(username: string) {
        return this.usersService.updateUser(username, { refreshToken: null });
    }

    async refreshTokens(id: number, refreshToken: string, res: Response) {
        const user: UserDto = await this.usersService.findUserById(id);
        if (!user || !user.refreshToken)
            throw new ForbiddenException("Access Denied");

        const payload = this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_SECRET_REFRESH,
        });

        const tokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );

        if (!tokenMatches) throw new ForbiddenException("Access Denied");

        if (payload.sub !== id) {
            throw new ForbiddenException("Access Denied");
        }

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.json({ ...user, tokens });
    }

    async updateRefreshToken(username: string, refreshToken: string) {
        const hashedRefreshToken = await argon2.hash(refreshToken);

        return this.usersService.updateUser(username, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(id: number, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: id,
                    username: username,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: "15m",
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: id,
                    username: username,
                },
                {
                    secret: process.env.JWT_SECRET_REFRESH,
                    expiresIn: "7d",
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
