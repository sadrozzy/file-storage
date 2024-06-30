import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { AuthUserDto } from "./dto/authUser.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserDto } from "../users/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findUserByUsername(username);

        if (user && bcrypt.compareSync(password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(authUserDto: AuthUserDto) {
        const user: UserDto = await this.usersService.findUserByUsername(
            authUserDto.username,
        );

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
        return {
            tokens,
        };
        // const payload = {
        //     username: authUserDto.username,
        //     sub: {
        //         id: user.id,
        //     },
        // };
        //
        // return {
        //     accessToken: this.jwtService.sign(payload),
        //     refreshToken: this.jwtService.sign(payload, { expiresIn: "7" }),
        // };
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

    // async refreshToken(user: UserDto) {
    //     const payload = {
    //         username: user.username,
    //         sub: {
    //             id: user.id,
    //         },
    //     };
    //
    //     return {
    //         accessToken: this.jwtService.sign(payload),
    //     };
    // }

    async refreshTokens(id: number, refreshToken: string) {
        const user: UserDto = await this.usersService.findUserById(id);

        if (!user || !user.refreshToken)
            throw new ForbiddenException("Access Denied");

        const tk1 = await this.jwtService.verifyAsync(user.refreshToken);
        const tk2 = await this.jwtService.verifyAsync(refreshToken);

        if (tk1.sub != tk2.sub) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
        return tokens;
    }

    async updateRefreshToken(username: string, refreshToken: string) {
        return this.usersService.updateUser(username, {
            refreshToken: refreshToken,
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
