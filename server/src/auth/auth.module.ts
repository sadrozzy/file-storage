import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "node:process";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { AccessStrategy } from "./strategies/access.strategy";
import { RefreshStrategy } from "./strategies/refresh.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "30d" },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        AccessStrategy,
        RefreshStrategy,
        // {
        //     provide: APP_GUARD,
        //     useClass: LocalAuthGuard,
        // },
    ],
    exports: [AuthService, AccessStrategy],
})
export class AuthModule {}
