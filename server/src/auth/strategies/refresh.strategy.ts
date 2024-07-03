import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Logger } from "@nestjs/common";
import { Request } from "express";

export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req.cookies?.refreshToken;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_REFRESH,
            passReqToCallback: true,
        });
    }

    private readonly logger = new Logger("RefreshStrategy");

    async validate(req: Request, payload: any) {
        const refreshToken = req.cookies?.refreshToken;
        return { ...payload, refreshToken };
    }
}

// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { Logger } from "@nestjs/common";
// import { Request } from "express";
//
// export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromHeader("refreshToken"),
//             ignoreExpiration: false,
//             secretOrKey: process.env.JWT_SECRET_REFRESH,
//             passReqToCallback: true,
//         });
//     }
//
//     private readonly logger = new Logger("RefreshStrategy");
//
//     async validate(req: Request, payload: any) {
//         const refreshToken = req
//             .get("Authorization")
//             .replace("Bearer", "")
//             .trim();
//         return { ...payload, refreshToken };
//     }
// }
