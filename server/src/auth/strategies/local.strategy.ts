import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    private readonly logger = new Logger("LocalStrategy ");

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return user;
    }
}
